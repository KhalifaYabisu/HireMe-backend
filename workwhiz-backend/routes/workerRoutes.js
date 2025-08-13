const express = require('express');
const router = express.Router();
const {
  getWorkers,
  createWorker,
  updateWorker,
  deleteWorker
} = require('../controllers/workerController');
const { protect } = require('../middleware/authMiddleware');

// Public: Get all workers
router.get('/', getWorkers);

// Protected: Add, update, delete workers
router.post('/', protect, createWorker);
router.put('/:id', protect, updateWorker);
router.delete('/:id', protect, deleteWorker);

module.exports = router;
