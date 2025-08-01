// routes/workerRoutes.js

const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker'); // Adjust path if needed

// Get all workers
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json({ success: true, count: workers.length, workers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add a new worker
router.post('/', async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    const savedWorker = await newWorker.save();
    res.status(201).json({ success: true, worker: savedWorker });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
