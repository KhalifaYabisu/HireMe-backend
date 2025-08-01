// Trigger redeploy after setting environment variables on Render

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workerRoutes = require('./routes/workerRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Assuming you added admin login routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Routes
app.get('/', (req, res) => {
  res.send('WorkWhiz API is running!');
});

app.use('/api/workers', workerRoutes);
app.use('/api/admin', adminRoutes); // Optional if you've implemented login

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
