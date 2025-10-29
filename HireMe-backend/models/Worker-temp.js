// models/Worker.js
import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  job: { type: String, required: true },
  location: { type: String, required: true }
});

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;
