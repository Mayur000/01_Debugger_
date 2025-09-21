const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalUnits: { type: Number, required: true },
  occupiedUnits: { type: Number, default: 0 },
  monthlyConsumption: { type: Number, default: 0 },
  bulkOrders: [{
    tankerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tanker' },
    quantity: { type: Number },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'delivered'], default: 'pending' }
  }],
  announcements: [{
    title: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Society', societySchema);