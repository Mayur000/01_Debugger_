const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Smart Water Management API is running!', timestamp: new Date() });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwater')
.then(() => {
  console.log('✅ MongoDB connected successfully');
  
  // Import routes after DB connection
  const authRoutes = require('./routes/auth.routes');
  const readingsRoutes = require('./routes/readings.routes');
  const tankerRoutes = require('./routes/tanker.routes');
  const societyRoutes = require('./routes/society.routes');

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/readings', readingsRoutes);
  app.use('/api/tankers', tankerRoutes);
  app.use('/api/society', societyRoutes);

  const PORT = 5002;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 API URL: http://localhost:${PORT}/api`);
    console.log(`🧪 Test URL: http://localhost:${PORT}/api/test`);
    console.log('📊 All systems operational!');
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});