const mongoose = require('mongoose');
const User = require('./models/User');
const Society = require('./models/Society');
require('dotenv').config();

const fixAllErrors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwater');
    console.log('🔧 Fixing all system errors...\n');

    // 1. Ensure AquaTrack Society exists
    let society = await Society.findOne({ name: 'AquaTrack Society' });
    if (!society) {
      society = new Society({
        name: 'AquaTrack Society',
        address: 'Smart Water Management Complex, Mumbai',
        adminId: new mongoose.Types.ObjectId(),
        totalUnits: 100,
        occupiedUnits: 0,
        announcements: [
          {
            title: 'Welcome to AquaTrack Society!',
            message: 'Your smart water management system is now active. Track consumption and join conservation efforts.',
            priority: 'high'
          },
          {
            title: 'Dark Mode Available',
            message: 'Switch between light and dark themes using the toggle in the navigation bar.',
            priority: 'medium'
          },
          {
            title: 'Water Conservation Tips',
            message: 'Check the Conservation Hub for daily tips and challenges to reduce water consumption.',
            priority: 'low'
          }
        ]
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
    console.log(`✅ Assigned ${unassignedUsers.length} users to society`);

    // 3. Update society member count
    const totalMembers = await User.countDocuments({ societyId: society._id });
    await Society.findByIdAndUpdate(society._id, { occupiedUnits: totalMembers });
    console.log(`✅ Updated society member count: ${totalMembers}`);

    // 4. Verify data integrity
    const userCount = await User.countDocuments();
    const societyCount = await Society.countDocuments();
    
    console.log('\n📊 System Status:');
    console.log(`   👥 Total Users: ${userCount}`);
    console.log(`   🏢 Societies: ${societyCount}`);
    console.log(`   🏠 Society Members: ${totalMembers}`);
    
    console.log('\n✅ All errors fixed! System ready to run.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing system:', error);
    process.exit(1);
  }
};

fixAllErrors();