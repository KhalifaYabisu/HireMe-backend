const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const authMiddleware = require('../middleware/authMiddleware');

// @desc    Get all workers
// @route   GET /api/workers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json({ success: true, count: workers.length, workers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc    Add a new worker
// @route   POST /api/workers
// @access  Private (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  const { name, occupation, location, phone } = req.body;
  try {
    const newWorker = new Worker({ name, occupation, location, phone });
    await newWorker.save();
    res.status(201).json({ success: true, worker: newWorker });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update a worker
// @route   PUT /api/workers/:id
// @access  Private (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWorker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.json({ success: true, worker: updatedWorker });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Delete a worker
// @route   DELETE /api/workers/:id
// @access  Private (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.json({ success: true, message: 'Worker deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
