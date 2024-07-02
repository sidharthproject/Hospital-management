import { query } from "express"
import { Doctor } from "../models/DoctorSchema.js"
import { Booking } from "../models/BookingSchema.js"
export const updatedoctor = async(req,res)=>{
    const id = req.params.doctorId
    
    try {
        const updatedDoctor =  await Doctor.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({success:true,message:"Successfully updated",data:updatedDoctor})
    } catch (error) {
        res.status(500).json({success:false,message:"Failed to update"})
    }
}
export const deletedoctor = async(req,res)=>{
    const id = req.params.doctorId

    try {
        Doctor.findByIdAndDelete(id,{$set:req.body},{new:true})
        res.status(200).json({success:true,message:"Successfully deleted"})
    } catch (error) {
        res.status(500).json({success:false,message:"Failed to delete"})
    }
}
export const getSingleDoctor = async(req,res)=>{
    const id = req.params.id

    try {
       const doctor = await Doctor.findById(id).populate("reviews").select("-password");
    
         const filteredReviews = doctor.reviews.filter(review => review !== null);

        // Replace the doctor's reviews with the filtered array
        doctor.reviews = filteredReviews;
        res.status(200).json({success:true,message:"doctor found",data:doctor})
    } catch (error) {
        res.status(404).json({success:false,message:"No doctor found"})
    }
}
export const getAllDoctor = async (req, res) => {
    try {
        const { query } = req.query;
        
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { specialization: { $regex: query, $options: 'i' } },
                ],
            }).select("-password");
        } else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select("-password");
        }
       
        res.status(200).json({ success: true, message: "Doctor found", data: doctors });
    } catch (error) {
        console.error("Error fetching doctors:", error); // Add this line for debugging
        res.status(404).json({ success: false, message: "Doctors not found" });
    }
}



export const getDoctorProfile = async (req,res)=>{

    const doctorId = req.userId
    console.log("getDoctorProfile",doctorId);
    try {
        const doctor = await Doctor.findById(doctorId)
        if(!doctor){
            return res.status(404).json({success:false,message:"Doctor not found"})
            }

            const {password, ...rest} = doctor._doc
            const appointments = await Booking.find({doctor:doctorId})
            res.status(200).json({success:true,message:'Profile info is getting', data:{...rest,appointments}})
    } catch (error) {
        return res.status(500).json({success:false,message:"Something went wrong"})
    }
    }