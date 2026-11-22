require('dotenv').config();

const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');
const { randomBytes } = require('node:crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { createApp } = require('../server/app');
const AdminSession = require('../server/models/AdminSession');

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI must be configured before running this integration check.');
}

const dayMs = 24 * 60 * 60 * 1000;
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3001';
const testAdminPassword = randomBytes(24).toString('base64url');
process.env.ADMIN_USERNAME = `session-test-${process.pid}`;
process.env.ADMIN_PASSWORD_HASH = bcrypt.hashSync(testAdminPassword, 12);
process.env.JWT_SECRET = randomBytes(32).toString('hex');
process.env.ADMIN_SESSION_DAYS = '30';
const testDatabaseUrl = new URL(process.env.MONGODB_URI);
const baseDatabaseName = testDatabaseUrl.pathname.replace(/^\//, '') || 'ieg';
const testDatabaseName = `${baseDatabaseName}_session_test_${process.pid}_${Date.now()}`;
testDatabaseUrl.pathname = `/${testDatabaseName}`;
process.env.MONGODB_URI = testDatabaseUrl.toString();

let server;

function startServer() {
  return new Promise((resolve, reject) => {
    const appServer = createApp().listen(0, '127.0.0.1', () => {
      const address = appServer.address();
      resolve({ server: appServer, baseUrl: `http://127.0.0.1:${address.port}` });
    });
    appServer.once('error', reject);
  });
}

function closeServer(appServer) {
  if (!appServer) return Promise.resolve();
  return new Promise((resolve, reject) => {
    appServer.close((error) => (error ? reject(error) : resolve()));
  });
}

function cookieFrom(response) {
  const setCookie = response.headers.get('set-cookie') || '';
  const cookie = setCookie.split(';', 1)[0];
  assert.match(cookie, /^adminToken=.+/);
  return { cookie, setCookie };
}

async function apiRequest(baseUrl, path, { method = 'GET', cookie, body, origin = frontendOrigin } = {}) {
  const headers = { Origin: origin };
  if (cookie) headers.Cookie = cookie;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  return fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function run() {
  assert.ok(process.env.MONGODB_URI, 'MONGODB_URI must be configured before running this integration check.');
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    let active = await startServer();
    server = active.server;

    const badOrigin = await apiRequest(active.baseUrl, '/api/admin/login', {
      method: 'POST',
      origin: 'https://untrusted.example',
      body: { username: process.env.ADMIN_USERNAME, password: 'invalid' },
    });
    assert.equal(badOrigin.status, 403, 'Login must reject untrusted origins.');

    const badPassword = await apiRequest(active.baseUrl, '/api/admin/login', {
      method: 'POST',
      body: { username: process.env.ADMIN_USERNAME, password: `${testAdminPassword}-wrong` },
    });
    assert.equal(badPassword.status, 401, 'Invalid credentials must be rejected.');

    const unauthorized = await apiRequest(active.baseUrl, '/api/admin/submissions');
    assert.equal(unauthorized.status, 401, 'Protected APIs must reject missing sessions.');

    const login = await apiRequest(active.baseUrl, '/api/admin/login', {
      method: 'POST',
      body: { username: process.env.ADMIN_USERNAME, password: testAdminPassword },
    });
    assert.equal(login.status, 200, 'Valid test credentials must authenticate.');
    const { cookie: initialCookie, setCookie } = cookieFrom(login);
    assert.match(setCookie, /HttpOnly/i, 'The session cookie must be HttpOnly.');
    assert.match(setCookie, /SameSite=Lax/i, 'The session cookie must use SameSite=Lax.');
    assert.match(setCookie, /Path=\/api\/admin/i, 'The session cookie must be scoped to admin APIs.');
    assert.match(setCookie, /Max-Age=2592000/i, 'The default session cookie must persist for 30 days.');

    const session = await apiRequest(active.baseUrl, '/api/admin/session', { cookie: initialCookie });
    assert.equal(session.status, 200, 'A new session must be authenticated.');

    const publicSubmission = await apiRequest(active.baseUrl, '/api/submissions', {
      method: 'POST',
      body: {
        name: 'Admin session integration test',
        email: 'admin-session-test@example.com',
        institution: 'Isolated test database',
        interest: 'Other',
        message: 'Temporary test record; this database is dropped by the test.',
      },
    });
    assert.equal(publicSubmission.status, 201, 'The public form should still save valid submissions.');
    const created = await publicSubmission.json();

    const list = await apiRequest(active.baseUrl, '/api/admin/submissions', { cookie: initialCookie });
    assert.equal(list.status, 200, 'An authenticated admin must be able to list submissions.');
    const listBody = await list.json();
    assert.equal(listBody.pagination.total, 1);
    assert.equal(listBody.submissions[0].id, created.submission.id);

    const detail = await apiRequest(active.baseUrl, `/api/admin/submissions/${created.submission.id}`, { cookie: initialCookie });
    assert.equal(detail.status, 200, 'An authenticated admin must be able to read a submission detail.');

    const decoded = jwt.decode(initialCookie.slice('adminToken='.length));
    const savedSession = await AdminSession.findOne({ sessionId: decoded.jti });
    assert.ok(savedSession, 'The authenticated session must be stored in MongoDB.');

    await closeServer(server);
    server = null;
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    active = await startServer();
    server = active.server;

    const afterRestart = await apiRequest(active.baseUrl, '/api/admin/session', { cookie: initialCookie });
    assert.equal(afterRestart.status, 200, 'The MongoDB-backed session must survive an API restart.');

    const sessionRecord = await AdminSession.findOne({ sessionId: decoded.jti });
    sessionRecord.expiresAt = new Date(Date.now() + 5 * dayMs);
    await sessionRecord.save();
    const refreshed = await apiRequest(active.baseUrl, '/api/admin/session', { cookie: initialCookie });
    assert.equal(refreshed.status, 200);
    const { cookie: refreshedCookie } = cookieFrom(refreshed);
    const refreshedSession = await AdminSession.findOne({ sessionId: decoded.jti });
    assert.ok(refreshedSession.expiresAt.getTime() > Date.now() + 29 * dayMs, 'Active sessions must roll forward before expiry.');

    const logout = await apiRequest(active.baseUrl, '/api/admin/logout', {
      method: 'POST',
      cookie: refreshedCookie,
    });
    assert.equal(logout.status, 200, 'Logout must succeed.');
    const invalidated = await apiRequest(active.baseUrl, '/api/admin/session', { cookie: refreshedCookie });
    assert.equal(invalidated.status, 401, 'Logout must invalidate the server-side session.');
    const invalidatedList = await apiRequest(active.baseUrl, '/api/admin/submissions', { cookie: refreshedCookie });
    assert.equal(invalidatedList.status, 401, 'A logged-out session must not access protected records.');

    console.log(JSON.stringify({
      badOrigin: badOrigin.status,
      invalidCredentials: badPassword.status,
      unauthorizedList: unauthorized.status,
      validLogin: login.status,
      cookiePersistentDays: 30,
      list: list.status,
      detail: detail.status,
      persistedAfterRestart: afterRestart.status === 200,
      slidingRefresh: refreshed.headers.has('set-cookie'),
      logout: logout.status,
      invalidatedSession: invalidated.status,
      isolatedDatabaseDropped: true,
    }));
  } finally {
    await closeServer(server);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.dropDatabase();
    }
    await mongoose.disconnect();
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
