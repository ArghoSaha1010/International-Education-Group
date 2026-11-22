const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomUUID, timingSafeEqual } = require('node:crypto');
const { getConfig } = require('../config/env');
const AdminSession = require('../models/AdminSession');
const { cookieOptions, getSessionDurationMs } = require('../adminSession');

function sameSecret(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

async function login(req, res, next) {
  try {
    const config = getConfig();
    const username = typeof req.body?.username === 'string' ? req.body.username : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    const usernameMatches = sameSecret(username, config.adminUsername);
    const passwordMatches = await bcrypt.compare(password, config.adminPasswordHash);

    if (!usernameMatches || !passwordMatches) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const sessionId = randomUUID();
    const expiresAt = new Date(Date.now() + getSessionDurationMs(config));
    await AdminSession.create({
      sessionId,
      adminUsername: config.adminUsername,
      expiresAt,
    });

    const token = jwt.sign({ role: 'admin' }, config.jwtSecret, {
      subject: config.adminUsername,
      jwtid: sessionId,
      algorithm: 'HS256',
      expiresIn: `${config.adminSessionDays}d`,
    });
    res.cookie('adminToken', token, cookieOptions(config));
    return res.json({ admin: { username: config.adminUsername } });
  } catch (error) {
    return next(error);
  }
}

async function logout(req, res, next) {
  const config = getConfig();
  const token = req.cookies && req.cookies.adminToken;

  try {
    if (token) {
      try {
        const payload = jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] });
        if (payload.jti) {
          await AdminSession.deleteOne({
            sessionId: payload.jti,
            adminUsername: config.adminUsername,
          });
        }
      } catch (error) {
        if (!['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(error.name)) {
          throw error;
        }
      }
    }
    res.clearCookie('adminToken', cookieOptions(config));
    return res.status(200).json({ message: 'Logged out.' });
  } catch (error) {
    res.clearCookie('adminToken', cookieOptions(config));
    return next(error);
  }
}

function session(req, res) {
  return res.json({ authenticated: true, admin: req.admin });
}

module.exports = { login, logout, session };
