import { Router } from 'express';
const router = Router();
import {
  getStats,
  getDoctors,
  getPatients,
  searchUsers,
  addUser,
  deleteUser,
  getFeedbacks,
  getAllUsers,
  createNotification,
  getNotifications
} from '../controllers/adminController.js';

// Clinic stats
router.get('/stats', getStats);

// View all doctors
router.get('/doctors', getDoctors);

// View all patients
router.get('/patients', getPatients);

// View all users by role (e.g., ?role=doctor/staff/patient)
router.get('/users', getAllUsers);

// Add a new user (doctor/staff/patient)
router.post('/add-user', addUser);

// Delete user by ID
router.delete('/users/:id', deleteUser);

// Search users by name
router.get('/search', searchUsers);

// Get all feedback
router.get('/feedback', getFeedbacks);

// Notifications
router.post('/notifications', createNotification);
router.get('/notifications', getNotifications);

export default router;

