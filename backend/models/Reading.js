const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meterReading: { type: Number, required: true },
  consumption: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  isAnomaly: { type: Boolean, default: false },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Reading', readingSchema);