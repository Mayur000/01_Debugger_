const mongoose = require('mongoose');
const User = require('./models/User');
const Society = require('./models/Society');
require('dotenv').config();

const createTestSociety = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwater');

    // Create a test user (society admin)
    const testUser = new User({
      name: 'Society Admin',
      email: 'admin@society.com',
      password: 'password123', // This will be hashed by the pre-save hook
      phone: '+91 9876543210',
      address: '123 Test Society, Bangalore',
      userType: 'society',
      isVerified: true
    });

    await testUser.save();
    console.log('✅ Test user created:', testUser._id);

    // Create a test society
    const testSociety = new Society({
      name: 'Green Valley Society',
      address: '456 Green Valley, Bangalore, Karnataka',
      adminId: testUser._id,
      totalUnits: 50,
      occupiedUnits: 25,
      monthlyConsumption: 125000, // 125,000 liters
      announcements: [
        {
          title: 'Welcome to Green Valley Society',
          message: 'Welcome to our smart water management system! Please log your water readings regularly.',
          priority: 'high'
        },
        {
          title: 'Water Conservation Tips',
          message: 'Remember to turn off taps when not in use and fix any leaks immediately.',
          priority: 'medium'
        }
      ]
    });

    await testSociety.save();
    console.log('✅ Test society created:', testSociety._id);

    // Update user with society ID
    await User.findByIdAndUpdate(testUser._id, { societyId: testSociety._id });
    console.log('✅ User linked to society');

    console.log('\n🎉 Test data created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Email: admin@society.com');
    console.log('Password: password123');
    console.log('\n🏢 Society Details:');
    console.log('Name: Green Valley Society');
    console.log('Total Units: 50');
    console.log('Occupied Units: 25');
    console.log('Occupancy Rate: 50%');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test data:', error);
    process.exit(1);
  }
};

createTestSociety();
