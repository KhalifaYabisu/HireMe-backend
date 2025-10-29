const Worker = require('../models/workerModel');

// @desc    Get all workers
// @route   GET /api/workers
// @access  Public
const getAllWorkers = async (req, res) => {
    try {
        const workers = await Worker.find();
        res.json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a worker by ID
// @route   GET /api/workers/:id
// @access  Public
const getWorkerById = async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json(worker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new worker
// @route   POST /api/workers
// @access  Private/Admin
const createWorker = async (req, res) => {
    try {
        const newWorker = new Worker(req.body);
        const savedWorker = await newWorker.save();
        res.status(201).json(savedWorker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update worker
// @route   PUT /api/workers/:id
// @access  Private/Admin
const updateWorker = async (req, res) => {
    try {
        const updatedWorker = await Worker.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedWorker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json(updatedWorker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete worker
// @route   DELETE /api/workers/:id
// @access  Private/Admin
const deleteWorker = async (req, res) => {
    try {
        const deletedWorker = await Worker.findByIdAndDelete(req.params.id);
        if (!deletedWorker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json({ message: 'Worker deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllWorkers,
    getWorkerById,
    createWorker,
    updateWorker,
    deleteWorker
};
