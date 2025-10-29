require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('./models/admin');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@workwhiz.com';
    const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log('ℹ️ Admin already exists:', email);
      await mongoose.disconnect();
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ email, password: hashed, isAdmin: true });

    console.log('✅ Admin created');
    console.log('   Email:', email);
    console.log('   Password:', password);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
    process.exit(1);
  }
})();
