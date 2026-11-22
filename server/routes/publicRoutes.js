const express = require('express');
const { createSubmission } = require('../controllers/submissionController');
const { validateSubmission } = require('../middleware/validateSubmission');

const router = express.Router();

router.post('/submissions', validateSubmission, createSubmission);

module.exports = router;
