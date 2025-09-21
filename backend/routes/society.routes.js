const express = require('express');
const Society = require('../models/Society');
const User = require('../models/User');
const Reading = require('../models/Reading');
const auth = require('../middleware/auth');

const router = express.Router();

// Create society
router.post('/', auth, async (req, res) => {
  try {
    const { name, address, totalUnits } = req.body;

    const society = new Society({
      name,
      address,
      totalUnits,
      adminId: req.user._id
    });

    await society.save();

    // Update user to society admin
    await User.findByIdAndUpdate(req.user._id, {
      userType: 'society',
      societyId: society._id
    });

    res.status(201).json(society);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get society dashboard
router.get('/dashboard', auth, async (req, res) => {
  try {
    const society = await Society.findOne({ adminId: req.user._id });
    if (!society) {
      return res.status(404).json({ message: 'Society not found' });
    }

    // Get society members
    const members = await User.find({ societyId: society._id });

    // Get total consumption for current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const memberIds = members.map(m => m._id);
    const monthlyReadings = await Reading.find({
      userId: { $in: memberIds },
      date: { $gte: startOfMonth }
    });

    const totalConsumption = monthlyReadings.reduce((sum, reading) => sum + reading.consumption, 0);

    res.json({
      society,
      members: members.length,
      totalConsumption,
      occupancyRate: Math.round((members.length / society.totalUnits) * 100),
      recentAnnouncements: society.announcements.slice(-5)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add announcement
router.post('/announcements', auth, async (req, res) => {
  try {
    const { title, message, priority } = req.body;

    const society = await Society.findOneAndUpdate(
      { adminId: req.user._id },
      {
        $push: {
          announcements: { title, message, priority }
        }
      },
      { new: true }
    );

    if (!society) {
      return res.status(404).json({ message: 'Society not found' });
    }

    res.json(society.announcements[society.announcements.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get society members consumption
router.get('/members/consumption', auth, async (req, res) => {
  try {
    const society = await Society.findOne({ adminId: req.user._id });
    if (!society) {
      return res.status(404).json({ message: 'Society not found' });
    }

    const members = await User.find({ societyId: society._id });
    const memberConsumption = [];

    for (const member of members) {
      const readings = await Reading.find({ userId: member._id })
        .sort({ date: -1 })
        .limit(30);

      const totalConsumption = readings.reduce((sum, reading) => sum + reading.consumption, 0);

      memberConsumption.push({
        name: member.name,
        email: member.email,
        totalConsumption,
        avgDaily: Math.round((totalConsumption / 30) * 100) / 100,
        lastReading: readings[0]?.date || null
      });
    }

    res.json(memberConsumption);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
