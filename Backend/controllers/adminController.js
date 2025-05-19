import { Doctor, Patient, Department, Appointment, Feedback, Notification} from '../models/index.js';
import { Op } from 'sequelize';

// Get overall clinic stats
export async function getStats(req, res) {
  try {
    const weeklyAppointments = await Appointment.count();
    const income = 0; // Placeholder – calculate from billing model if needed
    const patientCount = await Patient.count();
    const doctorCount = await Doctor.count();
    const departments = await Department.findAll();

    res.json({ weeklyAppointments, income, patientCount, doctorCount, departments });
  } catch (err) {
    res.status(500).json({ error: 'Could not load stats' });
  }
}

// View all doctors
export async function getDoctors(req, res) {
  try {
    const doctors = await Doctor.findAll({ include: Department });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch doctors' });
  }
}

// View all patients
export async function getPatients(req, res) {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch patients' });
  }
}

// View all users by role
export async function getAllUsers(req, res) {
  const { role } = req.query;

  // Mock data for staff
  const mockStaff = [
    {
      id: 1,
      name: 'Ravi Patel',
      email: 'ravi.patel@example.com',
      phone: '9876543210',
      age: 35,
      joiningDate: '2023-01-15',
      experience: '5 years',
      salary: '₹30,000',
      occupation: 'Receptionist',
      role: 'staff',
    },
    {
      id: 2,
      name: 'Anita Mehra',
      email: 'anita.mehra@example.com',
      phone: '9123456789',
      age: 29,
      joiningDate: '2022-09-01',
      experience: '3 years',
      salary: '₹28,000',
      occupation: 'Lab Technician',
      role: 'staff',
    },
  ];

  try {
    if (role === 'doctor') {
      const doctors = await Doctor.findAll();
      return res.json(doctors);
    } else if (role === 'patient') {
      const patients = await Patient.findAll();
      return res.json(patients);
    } else if (role === 'staff') {
      return res.json(mockStaff);
    } else {
      const allUsers = {
        doctors: await Doctor.findAll(),
        patients: await Patient.findAll(),
        staff: mockStaff,
      };
      return res.json(allUsers);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

// Add a user (basic version — should be validated)
export async function addUser(req, res) {
  const { role, ...data } = req.body;
  const normalizedRole = role.toLowerCase();

  const departmentMap = {
    Cardiology: 1,
    Orthopedics: 2,
    Pediatrics: 3,
    Dermatology: 4,
    Neurology: 5,
    Gastroenterology: 6,
    Psychiatry: 7,
    Ophthalmology: 8,
    Gynecology: 9,
    ENT: 10,
  };

  try {
    let newUser;
    if (normalizedRole === 'doctor') {
      data.departmentId = departmentMap[data.department] || null;
      delete data.department;
      newUser = await Doctor.create(data);
    } else if (normalizedRole === 'patient') {
      newUser = await Patient.create(data);
    } else if (normalizedRole === 'staff') {
      newUser = await Staff.create(data);
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding user' });
  }
}

// Delete a user by ID and role
export async function deleteUser(req, res) {
  const { id } = req.params;
  const { role } = req.query;
  try {
    let deleted;
    if (role === 'doctor') {
      deleted = await Doctor.destroy({ where: { id } });
    } else if (role === 'patient') {
      deleted = await Patient.destroy({ where: { id } });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    if (deleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' });
  }
}

// Search users (by name, partial match)
export async function searchUsers(req, res) {
  const { query } = req.query;

  try {
    const doctors = await Doctor.findAll({
      where: {
        name: { [Op.like]: `%${query}%` }
      },
      attributes: ['id', 'name', 'email', 'phone', 'specialization', 'experience', 'salary', 'departmentId']
    });

    const patients = await Patient.findAll({
      where: {
        name: { [Op.like]: `%${query}%` }
      },
      attributes: ['id', 'name', 'email', 'phone', 'dob', 'gender', 'address']
    });

    res.json({ doctors, patients });
  } catch (err) {
    console.error('Error searching users:', err);
    res.status(500).json({ message: 'Error searching users' });
  }
}

// Get all feedbacks
export async function getFeedbacks(req, res) {
  try {
    const feedbacks = await Feedback.findAll(); // fetch all feedbacks
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Failed to fetch feedback' });
  }
}

// Create a notification
export async function createNotification(req, res) {
  const { title, message, targetRole } = req.body;
  try {
    const newNotification = await Notification.create({ title, message, targetRole });
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ error: 'Error creating notification' });
  }
}

// Get all notifications
export async function getNotifications(req, res) {
  try {
    const notifications = await Notification.findAll({
      order: [['createdAt', 'DESC']], // Sort by the latest notifications first
    });

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
}

