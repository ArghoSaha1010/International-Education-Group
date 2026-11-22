const mongoose = require('mongoose');

const interests = [
  'Study opportunities',
  'Institutional partnership',
  'Agent partnership',
  'Brand enquiry',
  'Other',
];

const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    institution: { type: String, required: true, trim: true, maxlength: 200 },
    interest: { type: String, required: true, enum: interests },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Submission', submissionSchema);
