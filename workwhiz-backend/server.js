require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workerRoutes = require('./routes/workerRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('WorkWhiz API is running!');
});

// API routes
app.use('/api/workers', workerRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
