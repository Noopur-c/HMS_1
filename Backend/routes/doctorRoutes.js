import { Router } from 'express';
const router = Router();
import { getPendingAppointments, updateAppointmentStatus, getTodaysAppointments, updateTreatment, generateBill, getPatientHistory } from '../controllers/doctorController.js';

// Pending appointments
router.get('/:doctorId/pending-appointments', getPendingAppointments);

// Update appointment status (approve/reject)
router.put('/appointment/:appointmentId/status', updateAppointmentStatus);

// Today's appointments
router.get('/:doctorId/todays-appointments', getTodaysAppointments);

// Add treatment
router.post('/appointment/treatment', updateTreatment);

// Generate bill
router.post('/appointment/bill', generateBill);

// Patient history
router.get('/:doctorId/patient-history', getPatientHistory);

export default router;
