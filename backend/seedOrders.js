const mongoose = require('mongoose');
const Order = require('./models/Order');
const Tanker = require('./models/Tanker');
const User = require('./models/User');
require('dotenv').config();

const seedOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwater');
    
    // Get first tanker and create a test user
    const tanker = await Tanker.findOne();
    if (!tanker) {
      console.log('No tankers found. Please run seedData.js first.');
      return;
    }

    // Create a test user if none exists
    let user = await User.findOne();
    if (!user) {
      user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        userType: 'individual'
      });
      await user.save();
    }

    // Clear existing orders
    await Order.deleteMany({});
    
    // Create sample orders
    const sampleOrders = [
      {
        userId: user._id,
        tankerId: tanker._id,
        quantity: 2000,
        totalPrice: 2000 * tanker.pricePerLiter,
        deliveryAddress: '123 Test Street, Bangalore',
        deliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        status: 'confirmed'
      },
      {
        userId: user._id,
        tankerId: tanker._id,
        quantity: 5000,
        totalPrice: 5000 * tanker.pricePerLiter,
        deliveryAddress: '456 Sample Road, Bangalore',
        deliveryDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
        status: 'pending'
      }
    ];
    
    await Order.insertMany(sampleOrders);
    
    console.log('Sample orders created successfully!');
    console.log(`Created ${sampleOrders.length} orders for user: ${user.email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding orders:', error);
    process.exit(1);
  }
};

seedOrders();