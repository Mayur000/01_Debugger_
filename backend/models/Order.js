const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tankerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tanker', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'in-transit', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending' 
  },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  trackingInfo: {
    currentLocation: { type: String },
    estimatedArrival: { type: Date }
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);