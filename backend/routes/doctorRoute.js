import express from 'express';
import { isAuthorized, restrict } from '../middleware/authentication.js';
import reviewRouter from './reviewRouter.js';
import { updatedoctor, deletedoctor, getSingleDoctor, getAllDoctor, getDoctorProfile } from '../controller/doctorController.js';

const router = express.Router();



router.get('/:id', getSingleDoctor);
router.get('/', getAllDoctor);
router.put('/:doctorId', isAuthorized, restrict(['doctor']), updatedoctor);
router.delete('/:doctorId', isAuthorized, restrict(['doctor']), deletedoctor);
router.get('/profile/me', isAuthorized, restrict(['doctor']), getDoctorProfile);

export default router;
