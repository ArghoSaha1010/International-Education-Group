const jwt = require('jsonwebtoken');
const { getConfig } = require('../config/env');
const AdminSession = require('../models/AdminSession');
const { cookieOptions, getSessionDurationMs } = require('../adminSession');
const sessionRefreshDayMs = 24 * 60 * 60 * 1000;

async function requireAdmin(req, res, next) {
  const token = req.cookies && req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  try {
    const config = getConfig();
    const payload = jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] });
    if (payload.role !== 'admin' || payload.sub !== config.adminUsername || !payload.jti) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const now = Date.now();
    const session = await AdminSession.findOne({
      sessionId: payload.jti,
      adminUsername: config.adminUsername,
      expiresAt: { $gt: new Date(now) },
    });
    if (!session) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const durationMs = getSessionDurationMs(config);
    const refreshThresholdMs = Math.min(7 * sessionRefreshDayMs, durationMs / 4);
    if (session.expiresAt.getTime() - now <= refreshThresholdMs) {
      session.expiresAt = new Date(now + durationMs);
      await session.save();
      const refreshedToken = jwt.sign({ role: 'admin' }, config.jwtSecret, {
        subject: config.adminUsername,
        jwtid: payload.jti,
        algorithm: 'HS256',
        expiresIn: `${config.adminSessionDays}d`,
      });
      res.cookie('adminToken', refreshedToken, cookieOptions(config));
    }

    req.admin = { username: payload.sub };
    return next();
  } catch (error) {
    if (['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(error.name)) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    return next(error);
  }
}

module.exports = { requireAdmin };
