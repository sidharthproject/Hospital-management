import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: { type: String },
  gender: { type: String, enum: ["male", "female", "other"] },
  // Fields for doctors only  
  specialization: { type: String },
  qualifications: { type: Array },
  experiences: { type: Array },
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  isApproved: { type: String, enum: ["pending", "approved", "cancelled"], default: "pending" },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

DoctorSchema.methods.generateRefreshToken = function() {
  try {
      const token = jwt.sign(
          { _id: this._id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      );
      console.log('Doctor Generated Token:', token);
      return token;
  } catch (error) {
      console.error("Error generating refresh token:", error);
      throw error;
  }
}

DoctorSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(this.password, 10);
    console.log('Hashed Password:', hashedPassword);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


DoctorSchema.methods.ispasswordCorrect = async function (password) {
  try {
    const isPasswordValid = await bcrypt.compare(password, this.password);
    console.log('Password Comparison Result:', isPasswordValid);
    return isPasswordValid;
  } catch (error) {
    console.error('Error during password comparison:', error);
    return false; // Return false in case of any error
  }
};


export const Doctor = mongoose.model("Doctor", DoctorSchema);
