const express = require('express');
const rateLimit = require('express-rate-limit');
const { login, logout, session } = require('../controllers/adminController');
const { listSubmissions, getSubmission } = require('../controllers/submissionController');
const { requireAdmin } = require('../middleware/requireAdmin');
const { requireFrontendOrigin } = require('../middleware/requireFrontendOrigin');

const router = express.Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again later.' },
});

router.post('/login', requireFrontendOrigin, loginLimiter, login);
router.post('/logout', requireFrontendOrigin, logout);
router.get('/session', requireAdmin, session);
router.get('/submissions', requireAdmin, listSubmissions);
router.get('/submissions/:id', requireAdmin, getSubmission);

module.exports = router;
