const sessionDayMs = 24 * 60 * 60 * 1000;

function getSessionDurationMs(config) {
  return config.adminSessionDays * sessionDayMs;
}

function cookieOptions(config, maxAge = getSessionDurationMs(config)) {
  return {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: config.nodeEnv === 'production' ? 'none' : 'lax',
    path: '/api/admin',
    maxAge,
  };
}

module.exports = { cookieOptions, getSessionDurationMs, sessionDayMs };
