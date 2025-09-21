const mongoose = require('mongoose');
const User = require('./models/User');
const Society = require('./models/Society');
require('dotenv').config();

const assignUsersToSociety = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwater');
    
    // Find or create AquaTrack society
    let aquaTrackSociety = await Society.findOne({ name: 'AquaTrack Society' });
    
    if (!aquaTrackSociety) {
      // Create AquaTrack society
      const adminUser = await User.findOne({ userType: 'society' });
      
      if (!adminUser) {
        console.log('No society admin found. Creating default admin...');
        const defaultAdmin = new User({
          name: 'AquaTrack Admin',
          email: 'admin@aquatrack.com',
          password: 'hashedpassword123',
          phone: '+91 9999999999',
          address: 'AquaTrack Headquarters, Bangalore',
          userType: 'society'
        });
        await defaultAdmin.save();
        
        aquaTrackSociety = new Society({
          name: 'AquaTrack Society',
          address: 'Smart Water Management Complex, Bangalore',
          adminId: defaultAdmin._id,
          totalUnits: 100,
          occupiedUnits: 0,
          announcements: [{
            title: 'Welcome to AquaTrack Society!',
            message: 'All users are now part of our smart water management community. Track your consumption and participate in conservation efforts.',
            priority: 'high'
          }]
        });
        await aquaTrackSociety.save();
        
        // Update admin user with society ID
        await User.findByIdAndUpdate(defaultAdmin._id, { societyId: aquaTrackSociety._id });
      } else {
        aquaTrackSociety = new Society({
          name: 'AquaTrack Society',
          address: 'Smart Water Management Complex, Bangalore',
          adminId: adminUser._id,
          totalUnits: 100,
          occupiedUnits: 0,
          announcements: [{
            title: 'Welcome to AquaTrack Society!',
            message: 'All users are now part of our smart water management community. Track your consumption and participate in conservation efforts.',
            priority: 'high'
          }]
        });
        await aquaTrackSociety.save();
        
        // Update admin user with society ID
        await User.findByIdAndUpdate(adminUser._id, { societyId: aquaTrackSociety._id });
      }
    }
    
    // Assign all individual users to AquaTrack society
    const individualUsers = await User.find({ 
      userType: 'individual',
      societyId: { $exists: false }
    });
    
    let assignedCount = 0;
    for (const user of individualUsers) {
      await User.findByIdAndUpdate(user._id, { 
        societyId: aquaTrackSociety._id,
        unitNumber: `Unit-${String(assignedCount + 1).padStart(3, '0')}`
      });
      assignedCount++;
    }
    
    // Update society occupied units
    const totalMembers = await User.countDocuments({ societyId: aquaTrackSociety._id });
    await Society.findByIdAndUpdate(aquaTrackSociety._id, { 
      occupiedUnits: totalMembers 
    });
    
    console.log(`✅ Successfully assigned ${assignedCount} users to AquaTrack Society`);
    console.log(`📊 Total society members: ${totalMembers}`);
    console.log(`🏢 Society: ${aquaTrackSociety.name}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error assigning users to society:', error);
    process.exit(1);
  }
};

assignUsersToSociety();