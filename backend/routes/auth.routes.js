const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('address').notEmpty().withMessage('Address is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, address, userType } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Auto-assign to AquaTrack Society
    const Society = require('../models/Society');
    let aquaTrackSociety = await Society.findOne({ name: 'AquaTrack Society' });
    
    if (!aquaTrackSociety) {
      aquaTrackSociety = new Society({
        name: 'AquaTrack Society',
        address: 'Smart Water Management Complex, Mumbai',
        adminId: new require('mongoose').Types.ObjectId(),
        totalUnits: 100,
        occupiedUnits: 0
      });
      await aquaTrackSociety.save();
    }

    const userCount = await User.countDocuments({ societyId: aquaTrackSociety._id });
    const user = new User({ 
      name, 
      email, 
      password, 
      phone, 
      address, 
      userType,
      societyId: aquaTrackSociety._id,
      unitNumber: `Unit-${String(userCount + 1).padStart(3, '0')}`
    });
    await user.save();

    // Update society occupied units
    await Society.findByIdAndUpdate(aquaTrackSociety._id, { 
      occupiedUnits: userCount + 1 
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, userType: user.userType }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, userType: user.userType }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      userType: req.user.userType,
      phone: req.user.phone,
      address: req.user.address
    }
  });
});

module.exports = router;