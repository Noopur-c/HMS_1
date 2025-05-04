import { Router } from 'express';
const router = Router();
import { getStats, getDoctors, getPatients, searchUsers } from '../controllers/adminController.js';

// Clinic stats
router.get('/stats', getStats);

// View all doctors
router.get('/doctors', getDoctors);

// View all patients
router.get('/patients', getPatients);

// Search (name query param)
router.get('/search', searchUsers);

// Add/remove routes can go here too

export default router;
