import  {updateuser,deleteuser,getSingleUser,getAllUser,getUserProfile,getAppointments} from '../controller/userController.js'
import express from 'express'
import { isAuthorized } from '../middleware/authentication.js'
import { restrict } from '../middleware/authentication.js';


const router = express.Router()

router.get('/:id',isAuthorized,restrict(["patient"]),getSingleUser)
router.get('/',isAuthorized, getAllUser)
router.put('/:id',isAuthorized,restrict(["patient"]), updateuser)
router.delete('/:id',isAuthorized,restrict(["patient"]),deleteuser)
router.get('/profile/me',isAuthorized,restrict(["patient"]),getUserProfile)
router.get('/appointments/my-appoinment', isAuthorized, restrict(["patient"]), getAppointments)


export  default router;