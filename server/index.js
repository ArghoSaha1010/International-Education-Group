require('dotenv').config();

const { getConfig } = require('./config/env');
const { connectDatabase } = require('./config/database');
const { createApp } = require('./app');
const mongoose = require('mongoose');

async function start() {
  const config = getConfig();
  await connectDatabase(config.mongoUri);

  const app = createApp();
  const server = app.listen(config.port, () => {
    console.log(`Express API listening on port ${config.port}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

start().catch((error) => {
  console.error(`API startup failed: ${error.message}`);
  process.exitCode = 1;
});
