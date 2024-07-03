import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/authRoute.js'
import { dbConnection } from './Database/dbConnection.js'
import userRouter from './routes/userRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import reviewRoute from './routes/reviewRouter.js'

import bookingRoute from './routes/bookinRoute.js'

dotenv.config({ path: "./config/.env" })
const app = express()
mongoose.get('strictQuery', false)

// Middleware
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/doctors', doctorRouter) 
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)


// Connect to MongoDB and start server
dbConnection()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log('Server is running at port:', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log("mongodb connection error", error)
    })

    
