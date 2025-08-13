const Worker = require('../models/workerModel');

// @desc    Get all workers
// @route   GET /api/workers
// @access  Public
const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json({
      success: true,
      count: workers.length,
      workers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new worker
// @route   POST /api/workers
// @access  Private
const createWorker = async (req, res) => {
  try {
    const { name, occupation, location, phone } = req.body;
    if (!name || !occupation || !location || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const worker = await Worker.create({ name, occupation, location, phone });
    res.status(201).json(worker);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update worker
// @route   PUT /api/workers/:id
// @access  Private
const updateWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete worker
// @route   DELETE /api/workers/:id
// @access  Private
const deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.status(200).json({ success: true, message: 'Worker deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getWorkers,
  createWorker,
  updateWorker,
  deleteWorker
};
