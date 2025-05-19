import { Router } from 'express';
import {
  getBillsByPatientName,
  bookAppointment,
  getNotifications,
  getTreatmentHistoryByPatientName,
  getAppointmentsByPatientName,
  submitFeedback,
  populateNotifications,
  getAppointmentsPatientName
} from '../controllers/patientController.js';
import Patient from '../models/patient.js';

const router = Router();

router.get('/appointments/by-name/:name', getAppointmentsByPatientName);
router.get('/treatment-history/name/:name', getTreatmentHistoryByPatientName);
router.get('/appointments-bills', getBillsByPatientName);
router.post('/appointments', bookAppointment);
router.get('/notifications/:patientName', getNotifications);
router.get('/appointments/by-name', getAppointmentsPatientName);
router.post('/feedback', submitFeedback);
router.post('/populate', populateNotifications); 

router.get('/test', (req, res) => {
  res.send('Patient route is working');
});

export default router;



