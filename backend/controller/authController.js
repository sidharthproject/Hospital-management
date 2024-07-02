
import { User } from "../models/UserSchema.js"
import {Doctor} from "../models/DoctorSchema.js"
import { sendToken } from "../utis/jwt.js"
export const register = async (req, res) => {
  const { name, email, password, role, photo, gender } = req.body;
  console.log(req.body);
  try {
      let user = null;

      if (role === 'patient') {
          user = await User.findOne({ email });
      } else if (role === 'doctor') {
          user = await Doctor.findOne({ email });
      }

      if (user) {
          return res.status(400).json({ message: 'User already exists' });
      }

      if (!name || !email || !password || !role) {
          return res.status(400).json({ message: 'Required fields are missing' });
      }

      if (role === 'patient') {
          user = new User({
              name,
              email,
              password,
              photo: photo || '', // Assign a default value if photo is null
              gender,
              role
          });
      } else if (role === 'doctor') {
          user = new Doctor({
              name,
              email,
              password,
              photo: photo || '', // Assign a default value if photo is null
              gender,
              role
       
          });
      }

      if (!user) {
          return res.status(400).json({ message: 'Failed to create user' });
      }

      await user.save();
      res.status(200).json({ success: true, message: 'User successfully created' });
  } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


  export const login = async (req, res) => {
    const { email, password } = req.body; 
    if (!email || !password ) {
      return res.status(400).json({ message: 'Required fields are missing' });
  }
    try {
        let user = null;
        let userType = '';

        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (patient) {
            user = patient;
            userType = 'patient';
        } else if (doctor) {
            user = doctor;
            userType = 'doctor';
        } else {
            return res.status(404).json({ message: "User not found" });
        }
        
        console.log(user);

        const isPasswordValid = await user.ispasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: false, message: "Invalid email or password" });
        }

        // Log the user object
        console.log(user);

        sendToken(user, 201, res, `${userType} logged In Successfully`, userType);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const logout =async(req,res,next)=>{
    res
    .status(201)
    .cookie("token"," ",{
     httpOnly:true,
     secure:true,
     sameSite:"none",
     expires:new Date(Date.now())
    })
    .json({
     success:true,
     message:"User is loggedOut successfully"
    }
     )
 }