import { Router } from 'express';
import {
  getAllAppointments,
  getPendingAppointments,
  updateAppointmentStatus,
  getTodaysAppointments,
  updateTreatment,
  generateBill,
  getAllPatients,
  getTheAppointments,
  getAllPatientHistories,
  getDoctorsByDepartment
} from '../controllers/doctorController.js';
import Doctor from '../models/doctor.js';

const router = Router();

router.get('/appointments', getAllAppointments);

// Fetch pending appointments for a doctor
router.get('/:doctorId/pending-appointments', getPendingAppointments);

// Update appointment status (approve/reject)
router.put('/appointments/:appointmentId/status', updateAppointmentStatus);

// Get today's appointments for a doctor
router.get('/:doctorId/todays-appointments', getTodaysAppointments);

// Update treatment for an appointment
router.post('/updateTreatment', updateTreatment);

// Generate a bill for an appointment
router.post('/appointments/:appointmentId/bill', generateBill);

router.get('/patient-history', getAllPatientHistories);

// Get all patients
router.get('/AllPatients', getAllPatients);

// Get appointments for a patient
router.get('/AllAppointments', getTheAppointments);

router.get('/', getDoctorsByDepartment);


// Add a new doctor (Admin only)
router.post('/', async (req, res) => {
  const { name, email, phone, specialization, availability, experience, salary } = req.body;

  try {
    const newDoctor = await Doctor.create({
      name,
      email,
      phone,
      specialization,
      availability,
      experience,
      salary
    });

    res.status(201).json(newDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding doctor');
  }
});

export default router;


