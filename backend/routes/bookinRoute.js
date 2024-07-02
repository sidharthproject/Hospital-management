import express from 'express'
import { isAuthorized } from '../middleware/authentication.js'
import { getCheckoutFunction } from '../controller/bookingController.js'

const router = express.Router()

router.post('/checkoutsession/:doctorId',isAuthorized,getCheckoutFunction)

export default router