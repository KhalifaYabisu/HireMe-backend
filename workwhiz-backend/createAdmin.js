// createAdmin.js
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const email = 'admin@example.com';
    const password = 'admin123';

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log('Admin already exists');
    } else {
      const newAdmin = new Admin({ email, password });
      await newAdmin.save();
      console.log('✅ Admin created');
    }

    mongoose.disconnect();
  })
  .catch(err => console.error('Error:', err));
