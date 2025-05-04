import { Appointment, Treatment, Bill, Patient } from '../models/index.js';
import { Doctor, Notification } from '../models/index.js';

// Get pending appointments
export async function getPendingAppointments(req, res) {
  const { doctorId } = req.params;
  try {
    const appointments = await Appointment.findAll({
      where: { doctorId, status: 'pending' },
      include: Patient
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching pending appointments' });
  }
}

// Approve/reject appointment
export async function updateAppointmentStatus(req, res) {
  const { appointmentId } = req.params;
  const { status } = req.body; // should be 'approved' or 'rejected'

  try {
    const appointment = await Appointment.findByPk(appointmentId, {
      include: [{ model: Doctor }]
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Update status
    appointment.status = status;
    await appointment.save();

    // Create notification for patient
    const doctorName = appointment.Doctor.name;
    const message = `Your appointment with Dr. ${doctorName} has been ${status}.`;

    await Notification.create({
      patientId: appointment.patientId,
      message
    });

    res.json({ message: 'Status updated and notification sent.', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update status and notify' });
  }
}

// Today's appointments
export async function getTodaysAppointments(req, res) {
  const { doctorId } = req.params;
  const today = new Date().toISOString().split('T')[0];
  try {
    const appointments = await Appointment.findAll({
      where: { doctorId, date: today, status: 'approved' },
      include: Patient
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Could not get today\'s appointments' });
  }
}

// Update treatment
export async function updateTreatment(req, res) {
  const { appointmentId, disease, prescription, progress } = req.body;
  try {
    const treatment = await Treatment.create({ appointmentId, disease, prescription, progress });
    await Appointment.update({ status: 'completed' }, { where: { id: appointmentId } });
    res.json(treatment);
  } catch (err) {
    res.status(500).json({ error: 'Could not update treatment' });
  }
}

// Generate bill
export async function generateBill(req, res) {
  const { appointmentId, amount, details } = req.body;
  try {
    const bill = await Bill.create({ appointmentId, amount, details });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: 'Bill generation failed' });
  }
}

// View patient history
export async function getPatientHistory(req, res) {
  const { doctorId } = req.params;
  try {
    const treatments = await Treatment.findAll({
      include: {
        model: Appointment,
        where: { doctorId, status: 'completed' },
        include: Patient
      }
    });
    res.json(treatments);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching history' });
  }
}
