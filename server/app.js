const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { getConfig } = require('./config/env');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { errorHandler } = require('./middleware/errorHandler');

function createApp() {
  const config = getConfig();
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: config.frontendOrigin, credentials: true }));
  app.use(express.json({ limit: '20kb' }));
  app.use(cookieParser());

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  app.use('/api', publicRoutes);
  app.use('/api/admin', adminRoutes);
  app.use((req, res) => res.status(404).json({ error: 'API route not found.' }));
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
