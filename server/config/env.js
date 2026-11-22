const requiredValues = [
  'MONGODB_URI',
  'JWT_SECRET',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD_HASH',
];

function getConfig() {
  const missing = requiredValues.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must contain at least 32 characters.');
  }

  if (!/^\$2[aby]\$\d{2}\$/.test(process.env.ADMIN_PASSWORD_HASH)) {
    throw new Error('ADMIN_PASSWORD_HASH must be a bcrypt hash.');
  }

  const adminSessionDays = Number(process.env.ADMIN_SESSION_DAYS || 30);
  if (!Number.isInteger(adminSessionDays) || adminSessionDays < 1 || adminSessionDays > 90) {
    throw new Error('ADMIN_SESSION_DAYS must be a whole number from 1 to 90.');
  }

  return {
    port: Number.parseInt(process.env.PORT || '4001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    adminUsername: process.env.ADMIN_USERNAME,
    adminPasswordHash: process.env.ADMIN_PASSWORD_HASH,
    adminSessionDays,
    frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:3001',
  };
}

module.exports = { getConfig };
