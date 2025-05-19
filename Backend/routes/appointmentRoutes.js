import express from 'express';
import { getAvailableTimeSlots } from '../controllers/appointmentController.js';
const router = express.Router();

router.get('/timeslots', getAvailableTimeSlots);

export default router;