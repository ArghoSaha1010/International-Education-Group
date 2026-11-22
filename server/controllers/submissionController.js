const mongoose = require('mongoose');
const Submission = require('../models/Submission');

async function createSubmission(req, res, next) {
  try {
    const submission = await Submission.create(req.validatedSubmission);
    return res.status(201).json({
      message: 'Your message was received.',
      submission: { id: submission.id, createdAt: submission.createdAt },
    });
  } catch (error) {
    return next(error);
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function listSubmissions(req, res, next) {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
    const search = typeof req.query.search === 'string' ? req.query.search.trim().slice(0, 100) : '';
    const query = search
      ? { $or: ['name', 'email', 'institution', 'interest', 'message'].map((field) => ({ [field]: { $regex: escapeRegex(search), $options: 'i' } })) }
      : {};

    const [submissions, total] = await Promise.all([
      Submission.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Submission.countDocuments(query),
    ]);

    return res.json({
      submissions: submissions.map((submission) => ({ ...submission, id: submission._id.toString(), _id: undefined })),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return next(error);
  }
}

async function getSubmission(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid record identifier.' });
    }

    const submission = await Submission.findById(req.params.id).lean();
    if (!submission) return res.status(404).json({ error: 'Submission not found.' });

    return res.json({
      submission: { ...submission, id: submission._id.toString(), _id: undefined },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createSubmission, listSubmissions, getSubmission };
