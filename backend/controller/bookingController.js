import { User } from "../models/UserSchema.js";
import { Doctor } from "../models/DoctorSchema.js";
import { Booking } from "../models/BookingSchema.js";
import Stripe from 'stripe';

export const getCheckoutFunction = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Check if doctor.bio is empty and provide a default description
    const description = doctor.bio && doctor.bio.trim() !== '' ? doctor.bio : 'No description available';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor._id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: doctor.ticketPrice * 100, // Convert to smallest currency unit
            product_data: {
              name: doctor.name,
              description: description,
              images: doctor.photo ? [doctor.photo] : []
            }
          },
          quantity: 1
        }
      ]
    });


   

    // Create new booking
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
  
    });

    await booking.save();
    res.status(200).json({ success: true, message: "Successfully paid", session });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ success: false, message: "Error creating checkout session", error: error.message });
  }
};
