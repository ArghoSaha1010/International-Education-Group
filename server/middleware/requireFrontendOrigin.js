const { getConfig } = require('../config/env');

function requireFrontendOrigin(req, res, next) {
  const { frontendOrigin } = getConfig();
  if (req.get('Origin') !== frontendOrigin) {
    return res.status(403).json({ error: 'Request origin not allowed.' });
  }
  return next();
}

module.exports = { requireFrontendOrigin };
