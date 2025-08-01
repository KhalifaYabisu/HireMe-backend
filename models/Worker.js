// models/Worker.js

const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  location: String,
  phone: String,
}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);
