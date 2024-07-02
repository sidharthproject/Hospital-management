import express from 'express';
import { isAuthorized, restrict } from '../middleware/authentication.js';
import { getAllReviews, createReview } from '../controller/reviewController.js';

const router = express.Router()

router.get('/reviews',getAllReviews)
router.post('/:doctorId/reviews',isAuthorized, restrict(['patient']), createReview);

export default router;
