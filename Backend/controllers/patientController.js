import { Patient, Appointment, Treatment, Bill, Feedback, Doctor, Department } from '../models/index.js';

// Get patient profile
export async function getProfile(req, res) {
  const { patientId } = req.params;
  try {
    const patient = await Patient.findByPk(patientId);
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

// View current appointment
export async function getCurrentAppointment(req, res) {
  const { patientId } = req.params;
  try {
    const appointment = await Appointment.findOne({
      where: {
        patientId,
        status: ['pending', 'approved']
      },
      include: Doctor
    });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch appointment' });
  }
}

// View bill history
export async function getBillHistory(req, res) {
  const { patientId } = req.params;
  try {
    const bills = await Bill.findAll({
      include: {
        model: Appointment,
        where: { patientId, status: 'completed' }
      }
    });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get bills' });
  }
}

// View treatment history
export async function getTreatmentHistory(req, res) {
  const { patientId } = req.params;
  try {
    const treatments = await Treatment.findAll({
      include: {
        model: Appointment,
        where: { patientId, status: 'completed' }
      }
    });
    res.json(treatments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get treatments' });
  }
}

// Take appointment – step-wise (simplified as one route here)
export async function requestAppointment(req, res) {
  const { patientId, doctorId, date, time } = req.body;
  try {
    // Check if patient already has a pending/approved appointment
    const existing = await Appointment.findOne({
      where: { patientId, status: ['pending', 'approved'] }
    });
    if (existing) return res.status(400).json({ error: 'You already have a pending/approved appointment' });

    const appointment = await Appointment.create({ patientId, doctorId, date, time, status: 'pending' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to request appointment' });
  }
}

// Leave feedback
export async function leaveFeedback(req, res) {
  const { appointmentId, rating, comment } = req.body;
  try {
    const feedback = await Feedback.create({ appointmentId, rating, comment });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: 'Could not submit feedback' });
  }
}
