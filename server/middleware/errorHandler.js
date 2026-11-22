function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body contains invalid JSON.' });
  }
  if (error.name === 'ValidationError') {
    return res.status(422).json({ error: 'Submitted data is invalid.' });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid record identifier.' });
  }
  if (error.name === 'MongoServerSelectionError' || error.name === 'MongooseServerSelectionError') {
    return res.status(503).json({ error: 'The database is temporarily unavailable.' });
  }

  console.error('API error:', error.message);
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
}

module.exports = { errorHandler };
