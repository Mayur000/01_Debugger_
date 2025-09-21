const express = require('express');
const Tanker = require('../models/Tanker');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all available tankers
router.get('/', async (req, res) => {
  try {
    const { location, capacity, priceRange } = req.query;
    let query = { isAvailable: true };

    if (location) query.location = new RegExp(location, 'i');
    if (capacity) query.capacity = { $gte: parseInt(capacity) };
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      query.pricePerLiter = { $gte: min, $lte: max };
    }

    const tankers = await Tanker.find(query).sort({ rating: -1 });
    res.json(tankers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Book a tanker
router.post('/book', auth, async (req, res) => {
  try {
    const { tankerId, quantity, deliveryAddress, deliveryDate } = req.body;

    const tanker = await Tanker.findById(tankerId);
    if (!tanker || !tanker.isAvailable) {
      return res.status(400).json({ message: 'Tanker not available' });
    }

    const totalPrice = quantity * tanker.pricePerLiter;

    const order = new Order({
      userId: req.user._id,
      tankerId,
      quantity,
      totalPrice,
      deliveryAddress,
      deliveryDate: new Date(deliveryDate)
    });

    await order.save();
    await order.populate('tankerId');

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('tankerId')
      .sort({ createdAt: -1 });

    // Filter out orders with null tankerId (in case tanker was deleted)
    const validOrders = orders.filter(order => order.tankerId);

    res.json(validOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// Update order status
router.patch('/orders/:orderId/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.orderId, userId: req.user._id },
      { status },
      { new: true }
    ).populate('tankerId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Rate and review order
router.post('/orders/:orderId/review', auth, async (req, res) => {
  try {
    const { rating, review } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: req.params.orderId, userId: req.user._id },
      { rating, review },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update tanker rating
    const tanker = await Tanker.findById(order.tankerId);
    const newTotalRatings = tanker.totalRatings + 1;
    const newRating = ((tanker.rating * tanker.totalRatings) + rating) / newTotalRatings;

    await Tanker.findByIdAndUpdate(order.tankerId, {
      rating: Math.round(newRating * 10) / 10,
      totalRatings: newTotalRatings
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete completed order
router.delete('/orders/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.orderId,
      userId: req.user._id,
      status: 'delivered'
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or not delivered' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
