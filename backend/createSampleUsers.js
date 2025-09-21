const mongoose = require('mongoose');
const User = require('./models/User');
const Society = require('./models/Society');
const Reading = require('./models/Reading');
require('dotenv').config();

const createSampleUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwater');
    
    // Find AquaTrack society
    const aquaTrackSociety = await Society.findOne({ name: 'AquaTrack Society' });
    if (!aquaTrackSociety) {
      console.log('AquaTrack Society not found. Please run assignUsersToSociety.js first.');
      return;
    }
    
    // Sample users data
    const sampleUsers = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        password: 'hashedpassword123',
        phone: '+91 9876543210',
        address: 'Flat 101, AquaTrack Society, Bangalore',
        societyId: aquaTrackSociety._id,
        unitNumber: 'A-101'
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        password: 'hashedpassword123',
        phone: '+91 9876543211',
        address: 'Flat 102, AquaTrack Society, Bangalore',
        societyId: aquaTrackSociety._id,
        unitNumber: 'A-102'
      },
      {
        name: 'Amit Patel',
        email: 'amit.patel@example.com',
        password: 'hashedpassword123',
        phone: '+91 9876543212',
        address: 'Flat 201, AquaTrack Society, Bangalore',
        societyId: aquaTrackSociety._id,
        unitNumber: 'B-201'
      },
      {
        name: 'Sneha Reddy',
        email: 'sneha.reddy@example.com',
        password: 'hashedpassword123',
        phone: '+91 9876543213',
        address: 'Flat 202, AquaTrack Society, Bangalore',
        societyId: aquaTrackSociety._id,
        unitNumber: 'B-202'
      },
      {
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        password: 'hashedpassword123',
        phone: '+91 9876543214',
        address: 'Flat 301, AquaTrack Society, Bangalore',
        societyId: aquaTrackSociety._id,
        unitNumber: 'C-301'
      }
    ];
    
    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        createdUsers.push(user);
        
        // Create sample readings for each user
        const readings = [];
        for (let i = 0; i < 10; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          
          const meterReading = 1000 + (i * 50) + Math.floor(Math.random() * 100);
          const consumption = 50 + Math.floor(Math.random() * 100);
          
          readings.push({
            userId: user._id,
            meterReading: meterReading,
            consumption: consumption,
            date: date
          });
        }
        
        await Reading.insertMany(readings);
      }
    }
    
    // Update society occupied units
    const totalMembers = await User.countDocuments({ societyId: aquaTrackSociety._id });
    await Society.findByIdAndUpdate(aquaTrackSociety._id, { 
      occupiedUnits: totalMembers 
    });
    
    console.log(`✅ Created ${createdUsers.length} sample users`);
    console.log(`📊 Total society members: ${totalMembers}`);
    console.log('Sample users:');
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.unitNumber}) - ${user.email}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample users:', error);
    process.exit(1);
  }
};

createSampleUsers();