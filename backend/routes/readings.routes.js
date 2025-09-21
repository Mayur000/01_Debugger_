const express = require('express');
const Reading = require('../models/Reading');
const auth = require('../middleware/auth');

const router = express.Router();

// Add new reading
router.post('/', auth, async (req, res) => {
  try {
    const { meterReading, notes } = req.body;
    
    // Get last reading to calculate consumption
    const lastReading = await Reading.findOne({ userId: req.user._id }).sort({ date: -1 });
    const consumption = lastReading ? meterReading - lastReading.meterReading : 0;
    
    // Check for anomaly (high overnight usage)
    const isAnomaly = consumption > 100; // Simple anomaly detection
    
    const reading = new Reading({
      userId: req.user._id,
      meterReading,
      consumption,
      notes,
      isAnomaly
    });
    
    await reading.save();
    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user readings
router.get('/', auth, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const readings = await Reading.find({
      userId: req.user._id,
      date: { $gte: startDate }
    }).sort({ date: -1 });
    
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get consumption analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const readings = await Reading.find({ userId: req.user._id }).sort({ date: -1 }).limit(30);
    
    const totalConsumption = readings.reduce((sum, reading) => sum + reading.consumption, 0);
    const avgDaily = totalConsumption / readings.length || 0;
    const anomalies = readings.filter(r => r.isAnomaly).length;
    
    res.json({
      totalConsumption,
      avgDaily: Math.round(avgDaily * 100) / 100,
      anomalies,
      trend: readings.length > 1 ? (readings[0].consumption > readings[1].consumption ? 'up' : 'down') : 'stable'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;