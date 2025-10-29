import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
  phone: { type: String, required: [true, 'Phone number is required'] },
  password: { type: String, required: true, select: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;