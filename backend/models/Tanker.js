const mongoose = require('mongoose');

const tankerSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  supplierName: { type: String, required: true },
  phone: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerLiter: { type: Number, required: true },
  location: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  vehicleNumber: { type: String, required: true },
  waterQuality: { type: String, enum: ['potable', 'non-potable'], default: 'potable' }
}, { timestamps: true });

module.exports = mongoose.model('Tanker', tankerSchema);
