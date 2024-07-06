import { User } from "../models/UserSchema.js";
import { Booking } from "../models/BookingSchema.js";
import { Doctor } from "../models/DoctorSchema.js";
import bcrypt from 'bcrypt';


export const updateuser = async (req, res) => {
  const id = req.params.id;
  console.log("updateUser", id);

  try {
    // Check if password is present in the request body
    if (req.body.password) {
      // Generate salt
      const salt = await bcrypt.genSalt(10);
      // Hash the password
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, message: "Successfully updated", data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteuser = async(req,res)=>{
    const id = req.params.useId

    try {
        User.findByIdAndDelete(id,{$set:req.body},{new:true})
        res.status(200).json({success:true,message:"Successfully deleted"})
    } catch (error) {
        res.status(500).json({success:false,message:"Failed to delete"})
    }
}
export const getSingleUser = async(req,res)=>{
    console.log("Request Params:", req.params); // Log request parameters
    const userId = req.params.useId;
    console.log( "getSingleuser", userId);
    try {
       const user = await User.findById(userId).select("-password");
        res.status(200).json({success:true,message:"user found",data:user});
    } catch (error) {
        console.error(error); // Log any potential errors for debugging
        res.status(404).json({success:false,message:"No user found"});
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        
        res.status(200).json({ success: true, message: "Users found", data: users });
    } catch (error) {
        res.status(404).json({ success: false, message: "Users not found" });
    }
}

export const getUserProfile = async(req,res)=>{
    const userId = req.userId
    console.log("getUserProfile",userId);
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
            }

            const {password, ...rest} = user._doc

            res.status(200).json({success:true,message:'Profile info is getting', data:{...rest}})
    } catch (error) {
        return res.status(500).json({success:false,message:"Something went wrong"})
    }
}


export const getAppointments = async (req, res) => {
    try {
      console.log("getAppointments", req.userId);
  
      // Fetch bookings for the user
      const bookings = await Booking.find({ user: req.userId });
      console.log("bookings", bookings);
  
      if (bookings.length === 0) {
        return res.status(200).json({ success: true, message: 'No appointments found', data: [] });
      }
  
      // Extract doctor IDs from bookings
      const doctorIds = bookings.map(el => el.doctor);
      console.log("doctorIds", doctorIds);
  
      // Fetch doctor details
      const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password');
      console.log("doctors", doctors);
  
      res.status(200).json({ success: true, message: 'Appointments retrieved successfully', data: doctors });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: 'Something went wrong while getting appointments' });
    }
  };

