const mongoose = require('mongoose');

const adminSessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    adminUsername: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

adminSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('AdminSession', adminSessionSchema);
