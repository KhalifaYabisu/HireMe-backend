require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workerRoutes = require('./models/workerRoutes'); // updated import

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/workers', workerRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('WorkWhiz API is running!');
});

// DB Connection + Server Start
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workwhizDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
