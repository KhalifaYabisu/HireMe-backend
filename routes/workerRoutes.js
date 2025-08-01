const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

// GET all workers
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json({ success: true, count: workers.length, workers });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST a new worker
router.post('/', async (req, res) => {
  try {
    const { name, occupation, location, phone } = req.body;
    const newWorker = new Worker({ name, occupation, location, phone });
    await newWorker.save();
    res.status(201).json({ success: true, worker: newWorker });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
