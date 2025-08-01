const express = require('express');
const router = express.Router();
const Worker = require('./workerModel');

// Create a new worker
router.post('/', async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    await newWorker.save();
    res.status(201).json({ success: true, data: newWorker });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get all workers
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json({ success: true, count: workers.length, workers });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch workers' });
  }
});

module.exports = router;
