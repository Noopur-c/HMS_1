import { Doctor, Patient, Department, Appointment } from '../models/index.js';

// Clinic Stats
export async function getStats(req, res) {
  try {
    const weeklyAppointments = await Appointment.count(); // Add filtering for week if needed
    const income = 0; // Placeholder (you can sum all bill amounts)
    const patientCount = await Patient.count();
    const doctorCount = await Doctor.count();
    const departments = await Department.findAll();

    res.json({ weeklyAppointments, income, patientCount, doctorCount, departments });
  } catch (err) {
    res.status(500).json({ error: 'Could not load stats' });
  }
}

// View doctors
export async function getDoctors(req, res) {
  const doctors = await Doctor.findAll({ include: Department });
  res.json(doctors);
}

// View patients
export async function getPatients(req, res) {
  const patients = await Patient.findAll();
  res.json(patients);
}

// Search users
export async function searchUsers(req, res) {
  const { query } = req.query;
  const doctors = await Doctor.findAll({ where: { name: { [Op.like]: `%${query}%` } } });
  const patients = await Patient.findAll({ where: { name: { [Op.like]: `%${query}%` } } });
  res.json({ doctors, patients });
}

// Add/Remove logic can go here (register, delete, etc.)
