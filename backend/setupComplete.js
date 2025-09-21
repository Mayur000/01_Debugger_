const mongoose = require('mongoose');
const User = require('./models/User');
const Society = require('./models/Society');
const Reading = require('./models/Reading');
const Tanker = require('./models/Tanker');
require('dotenv').config();

const setupComplete = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwater');
    
    console.log('🔧 Setting up Smart Water Management System...\n');
    
    // 1. Ensure AquaTrack Society exists
    let society = await Society.findOne({ name: 'AquaTrack Society' });
    if (!society) {
      society = new Society({
        name: 'AquaTrack Society',
        address: 'Smart Water Management Complex, Mumbai',
        adminId: new mongoose.Types.ObjectId(),
        totalUnits: 100,
        occupiedUnits: 0,
        announcements: [{
          title: 'Welcome to AquaTrack Society!',
          message: 'All users are now part of our smart water management community.',
          priority: 'high'
        }]
      });
      await society.save();
      console.log('✅ Created AquaTrack Society');
    }
    
    // 2. Assign all users to society
    const unassignedUsers = await User.find({ societyId: { $exists: false } });
    for (let i = 0; i < unassignedUsers.length; i++) {
      await User.findByIdAndUpdate(unassignedUsers[i]._id, {
        societyId: society._id,
        unitNumber: `Unit-${String(i + 1).padStart(3, '0')}`
      });
    }
    
    // 3. Update society member count
    const totalMembers = await User.countDocuments({ societyId: society._id });
    await Society.findByIdAndUpdate(society._id, { occupiedUnits: totalMembers });
    
    // 4. Check data counts
    const userCount = await User.countDocuments();
    const readingCount = await Reading.countDocuments();
    const tankerCount = await Tanker.countDocuments();
    
    console.log('📊 System Status:');
    console.log(`   👥 Total Users: ${userCount}`);
    console.log(`   🏢 Society Members: ${totalMembers}`);
    console.log(`   📈 Water Readings: ${readingCount}`);
    console.log(`   🚛 Tanker Suppliers: ${tankerCount}`);
    console.log(`   🏠 Society: ${society.name}`);
    
    console.log('\n✅ Smart Water Management System is ready!');
    console.log('🌐 All users can now access:');
    console.log('   - Individual Dashboard (/dashboard)');
    console.log('   - Society Dashboard (/society)');
    console.log('   - Tanker Marketplace (/tankers)');
    console.log('   - Conservation Hub (/conservation)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
};

setupComplete();