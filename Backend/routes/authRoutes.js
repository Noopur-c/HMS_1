import { Router } from 'express';
const router = Router();

// Import the authController correctly to access all methods
import * as authController from '../controllers/authController.js';

// Logins
router.post('/login/patient', authController.loginPatient);
router.post('/login/doctor', authController.loginDoctor);
router.post('/login/admin', authController.loginAdmin);

// Register endpoints
router.post('/register/patient', authController.registerPatient);
router.post('/register/doctor', authController.registerDoctor);
router.post('/register/admin', authController.registerAdmin);

export default router;

