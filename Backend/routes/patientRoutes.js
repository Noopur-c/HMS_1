import { Router } from 'express';
const router = Router();
import { getProfile, getCurrentAppointment, getBillHistory, getTreatmentHistory, requestAppointment, leaveFeedback } from '../controllers/patientController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

// Profile
router.get('/:patientId/profile', verifyToken(['patient']), getProfile);

// Current appointment
router.get('/:patientId/current-appointment', verifyToken(['patient']), getCurrentAppointment);

// Bill history
router.get('/:patientId/bills', verifyToken(['patient']), getBillHistory);

// Treatment history
router.get('/:patientId/treatments', verifyToken(['patient']), getTreatmentHistory);

// Request appointment
router.post('/:patientId/request-appointment', verifyToken(['patient']), requestAppointment);

// Leave feedback
router.post('/:patientId/feedback', verifyToken(['patient']), leaveFeedback);

export default router;
