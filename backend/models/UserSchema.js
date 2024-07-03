import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: { type: String, enum: ['patient', 'admin'], default: 'patient' },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: 'Appointment' }],
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.ispasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateRefreshToken = function() {
  try {
 
    const token = jwt.sign(
      { _id: this._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    console.log('Generated Token:', token);
    return token;
  } catch (error) {
    console.error('Error generating refresh token:', error);
    throw error;
  }
};

export const User = mongoose.model('User', UserSchema);
