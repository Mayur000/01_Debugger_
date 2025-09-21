const mongoose = require('mongoose');
const Society = require('./models/Society');
require('dotenv').config();

const createAnnouncements = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwater');
    
    const society = await Society.findOne({ name: 'AquaTrack Society' });
    if (!society) {
      console.log('AquaTrack Society not found');
      return;
    }

    const announcements = [
      {
        title: 'Water Conservation Week',
        message: 'Join us for Water Conservation Week! Reduce your daily consumption by 20% and win exciting prizes. Track your progress on the dashboard.',
        priority: 'high'
      },
      {
        title: 'Scheduled Maintenance',
        message: 'Water supply will be interrupted on Sunday from 10 AM to 2 PM for routine maintenance. Please store water accordingly.',
        priority: 'medium'
      },
      {
        title: 'New Tanker Suppliers Added',
        message: 'We have added 3 new verified water tanker suppliers to our marketplace. Check out competitive rates and faster delivery options.',
        priority: 'low'
      },
      {
        title: 'Leak Detection Alert',
        message: 'Our system detected unusual water consumption patterns in some units. Please check for leaks and report any issues immediately.',
        priority: 'high'
      },
      {
        title: 'Monthly Water Report Available',
        message: 'Your monthly water consumption report is now available. View detailed analytics and conservation tips in your dashboard.',
        priority: 'medium'
      }
    ];

    // Clear existing announcements and add new ones
    await Society.findByIdAndUpdate(society._id, {
      announcements: announcements
    });

    console.log(`✅ Created ${announcements.length} announcements for AquaTrack Society`);
    announcements.forEach(ann => {
      console.log(`- ${ann.title} (${ann.priority})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating announcements:', error);
    process.exit(1);
  }
};

createAnnouncements();