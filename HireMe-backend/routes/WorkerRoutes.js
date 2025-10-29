import express from "express";
import Worker from "../models/Worker.js";

const router = express.Router();

// GET all workers
router.get("/", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single worker by ID
router.get("/:id", async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.json(worker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new worker
router.post("/", async (req, res) => {
  const worker = new Worker({
    name: req.body.name,
    job: req.body.job,
    location: req.body.location,
  });

  try {
    const newWorker = await worker.save();
    res.status(201).json(newWorker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a worker
router.put("/:id", async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.json(updatedWorker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a worker
router.delete("/:id", async (req, res) => {
  try {
    const deletedWorker = await Worker.findByIdAndDelete(req.params.id);
    if (!deletedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.json({ message: "Worker deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
