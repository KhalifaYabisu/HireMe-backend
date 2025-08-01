require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workerRoutes = require('./routes/workerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/workers', workerRoutes);

app.get('/', (req, res) => {
  res.send('WorkWhiz API is running!');
});

// DB connection + Start server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});
