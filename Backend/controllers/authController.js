import pkg from 'jsonwebtoken';
const { sign } = pkg;
import bcrypt from 'bcryptjs';
import { Patient, Doctor, Admin } from '../models/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// 🔐 Generate token
function generateToken(user, role) {
  return sign({ id: user.id, role }, JWT_SECRET, { expiresIn: '1d' });
}

// 🧑 Patient login
export async function loginPatient(req, res) {
  const { email, password } = req.body;
  const patient = await Patient.findOne({ where: { email } });
  if (!patient || !bcrypt.compareSync(password, patient.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = generateToken(patient, 'patient');
  res.json({ token, patient });
}

// 🧑‍⚕️ Doctor login
export async function loginDoctor(req, res) {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ where: { email } });
  if (!doctor || !bcrypt.compareSync(password, doctor.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = generateToken(doctor, 'doctor');
  res.json({ token, doctor });
}

// 👨‍💼 Admin login
export async function loginAdmin(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = generateToken(admin, 'admin');
  res.json({ token, admin });
}

// 📝 Register Patient
export async function registerPatient(req, res) {
  try {
    const { name, email, password, phone } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newPatient = await Patient.create({ name, email, password: hashedPassword, phone });
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
}

// 📝 Register Doctor
export async function registerDoctor(req, res) {
  try {
    const { name, email, password, departmentId } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newDoctor = await Doctor.create({ name, email, password: hashedPassword, departmentId });
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
}

// 📝 Register Admin
export async function registerAdmin(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = await Admin.create({ name, email, password: hashedPassword });
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
}
