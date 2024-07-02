import { Review } from '../models/ReviewSchema.js';
import { Doctor } from '../models/DoctorSchema.js';

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, message: 'Successful', data: reviews });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Not Found' });
    }
};

export const createReview = async (req, res) => {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.userId;
    

    
    const newReview = new Review(req.body)
    
    try {
        const savedReview = await newReview.save();
        if (!savedReview) {
            return res.status(404).json({ success: false, message: 'Failed to save review' });
        }
        
        const { user, ...responseData } = savedReview.toObject();
        const userId = user._id;
        
        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: { reviews: savedReview._id }
        });
        
        res.status(200).json({
            success: true,
            message: 'Review submitted successfully',
            data: {
                ...responseData,
                user: userId
            }
        });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};
