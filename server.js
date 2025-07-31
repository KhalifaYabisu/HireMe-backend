require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ENV Variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workwhizDB';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Worker Model
const workerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  skill: { 
    type: String, 
    required: true,
    enum: ['Electrician', 'Plumber', 'Carpenter', 'Cleaner', 'Technician']
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^[0-9]{10,15}$/, 'Invalid phone number']
  }
}, { timestamps: true });

const Worker = mongoose.model('Worker', workerSchema);

// Routes

app.get('/', (req, res) => {
  res.send('WorkWhiz API is running!');
});

app.post('/api/add-sample-workers', async (req, res) => {
  try {
    const sampleWorkers = [
      { name: 'John Smith', skill: 'Electrician', phone: '08123456789' },
      { name: 'Maria Garcia', skill: 'Plumber', phone: '08234567890' },
      { name: 'David Kim', skill: 'Carpenter', phone: '08345678901' },
      { name: 'Sarah Johnson', skill: 'Cleaner', phone: '08456789012' },
      { name: 'Michael Brown', skill: 'Technician', phone: '08567890123' }
    ];

    await Worker.deleteMany({});
    const createdWorkers = await Worker.insertMany(sampleWorkers);

    res.status(201).json({
      success: true,
      message: 'Sample workers added',
      count: createdWorkers.length,
      workers: createdWorkers
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/workers', async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });
    res.json({ success: true, count: workers.length, workers });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch workers' });
  }
});

app.post('/api/workers', async (req, res) => {
  try {
    const { name, skill, phone } = req.body;
    const newWorker = new Worker({ name, skill, phone });
    await newWorker.save();
    res.status(201).json({
      success: true,
      message: 'Worker created',
      worker: newWorker
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Failed to create worker',
      details: err.message
    });
  }
});

app.put('/api/workers/:id', async (req, res) => {
  try {
    const { name, skill, phone } = req.body;
    const updated = await Worker.findByIdAndUpdate(
      req.params.id,
      { name, skill, phone },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Worker not found' });
    res.json({ success: true, message: 'Worker updated', worker: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Failed to update', details: err.message });
  }
});

app.delete('/api/workers/:id', async (req, res) => {
  try {
    const deleted = await Worker.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Worker not found' });
    res.json({ success: true, message: 'Worker deleted', worker: deleted });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Failed to delete', details: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`➡ POST sample:        POST http://localhost:${PORT}/api/add-sample-workers`);
  console.log(`➡ GET all:            GET  http://localhost:${PORT}/api/workers`);
  console.log(`➡ POST new:           POST http://localhost:${PORT}/api/workers`);
  console.log(`➡ PUT update:         PUT  http://localhost:${PORT}/api/workers/:id`);
  console.log(`➡ DELETE worker:      DELETE http://localhost:${PORT}/api/workers/:id`);
});
