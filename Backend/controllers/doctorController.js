import { Appointment, Treatment, Bill, Patient } from '../models/index.js';
import { Doctor, Notification } from '../models/index.js';

export async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Doctor,
          attributes: ['id', 'name'] // include doctor's id and name
        },
        {
          model: Patient,
          attributes: ['id', 'name'] // include patient's id and name
        }
      ]
    });
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Failed to retrieve appointments' });
  }
}

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

  try {
    const appointments = await Appointment.findAll({
      where: { status: 'Confirmed' }, 
      include: [
        { model: Patient, attributes: ['id', 'name'] },
        { model: Doctor, attributes: ['id', 'name'] }
      ]
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not get appointments" });
  }
}

// Update treatment
export async function updateTreatment(req, res)  {
  const { patientId, doctorId, date, time, diagnosis, treatmentDetails, prescription } = req.body;

  if (!patientId || !doctorId || !diagnosis || !treatmentDetails || !prescription || !date || !time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Step 1: Create the appointment
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      time,
      status: 'Confirmed'
    });

    // Step 2: Create the treatment using the appointment ID
    const treatment = await Treatment.create({
      patientId,
      doctorId,
      appointmentId: appointment.id,
      diagnosis,
      treatmentDetails,
      prescription,
      date
    });

    res.status(201).json({ message: "Treatment and appointment created successfully", treatment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add treatment and appointment" });
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


export async function getAllPatientHistories(req, res) {
  try {
    const treatmentHistories = await Treatment.findAll({
      attributes: ['id', 'diagnosis', 'treatmentDetails', 'prescription', 'date', 'createdAt', 'updatedAt', 'patientId', 'doctorId', 'appointmentId'],
      include: [
        {
          model: Appointment,
          attributes: ['id', 'date', 'time', 'status', 'createdAt', 'updatedAt', 'patientId', 'doctorId'], // Only the correct attributes for Appointment
          include: [
            {
              model: Patient,
              attributes: ['id', 'name', 'email', 'phone', 'dob', 'gender', 'address', 'createdAt', 'updatedAt'] // Updated Patient attributes
            },
            {
              model: Doctor,
              attributes: ['id', 'name', 'email', 'phone', 'specialization', 'availability', 'experience', 'salary', 'createdAt', 'updatedAt', 'departmentId'] // Updated Doctor attributes
            }
          ]
        }
      ],
      where: {
        '$Appointment.status$': 'completed'
      },
      order: [['date', 'DESC']]
    });

    return res.status(200).json({ treatmentHistories });
  } catch (error) {
    console.error('Error fetching treatment histories:', error);
    return res.status(500).json({ message: 'Error fetching treatment histories' });
  }
}

export async function getAllPatients(req, res)  {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Failed to fetch patients', error });
  }
};

export async function getTheAppointments(req, res) {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Failed to fetch appointments', error });
  }
};

export async function getDoctorsByDepartment(req, res) {
  const { department } = req.query;

  if (!department) return res.status(400).json({ error: 'Department is required' });

  try {
    const doctors = await Doctor.findAll({
      where: { specialization: department },
      attributes: ['id', 'name']
    });

    res.status(200).json(doctors);
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};
