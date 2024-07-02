import jwt from 'jsonwebtoken';
import { Doctor } from '../models/DoctorSchema.js';
import { User } from '../models/UserSchema.js';

export const isAuthorized = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        token = value;
        break;
      }
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }


  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log('Decoded Token:', decodedToken);
    req.userId = decodedToken._id;
    req.role = decodedToken.role;
    console.log('User ID set in request:', req.userId);
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).json({ success: false, message: 'Invalid token, authorization denied' });
  }
};



export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId;
   

    if (!userId) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    try {
        const user = await User.findById(userId);
        const doctor = await Doctor.findById(userId);
        const foundUser = user || doctor; // Check both User and Doctor collections
     

        if (!foundUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!roles.includes(foundUser.role)) {
            console.log(`restrict - Role mismatch: required roles ${roles}, user role ${foundUser.role}`);
            return res.status(401).json({ success: false, message: "You are not authorized" });
        }

        next();
    } catch (error) {
        console.error("restrict - Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
