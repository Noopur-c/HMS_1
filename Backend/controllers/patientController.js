import { Appointment, Treatment, Bill, Notification, Doctor, Patient, PatientsNotification, Feedback } from '../models/index.js';
import { Op } from 'sequelize';

export async function getAppointmentsByPatientName(req, res) {
  const { name } = req.params;

  try {
    // Find patient(s) with matching name (case-insensitive)
    const patients = await Patient.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`  
        }
      }
    });

    if (!patients.length) {
      return res.status(404).json({ message: 'No patient found with this name.' });
    }

    const patientIds = patients.map(p => p.id);

    // Find appointments for the matched patients
    const appointments = await Appointment.findAll({
      where: {
        patientId: {
          [Op.in]: patientIds
        }
      },
      include: [
        { model: Doctor, attributes: ['id', 'name'] },
        { model: Patient, attributes: ['id', 'name'] }
      ]
    });

    res.json({ appointments });
  } catch (err) {
    console.error('Error fetching appointments by patient name:', err);
    res.status(500).json({ error: 'Failed to fetch appointments.' });
  }
}

// Get treatment history of a patient
export async function getTreatmentHistoryByPatientName(req, res) {
  const { name } = req.params;
  try {
    // Step 1: Find the patient by name
    const patient = await Patient.findOne({ where: { name } });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Step 2: Fetch treatments using the patient's ID
    const history = await Treatment.findAll({
      where: { patientId: patient.id },
      include: [
        {
          model: Appointment,
          include: [
            { model: Doctor, attributes: ['id', 'name'] },
            { model: Patient, attributes: ['id', 'name'] }
          ]
        }
      ],
      order: [['date', 'DESC']]
    });

    res.json(history);
  } catch (err) {
    console.error('Error fetching treatment history:', err);
    res.status(500).json({ error: 'Failed to retrieve treatment history' });
  }
}


// Get bills for a patient
export async function getBillsByPatientName (req, res) {
  const { patientName } = req.query;

  try {
    // Find patient by name first
    const patient = await Patient.findOne({ where: { name: patientName } });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Get all appointments for this patient including bills and doctor info
    const appointments = await Appointment.findAll({
      where: { patientId: patient.id },
      include: [
        { model: Bill },
        {
          model: Doctor,
          as: 'Doctor',  // alias as defined in your associations
          attributes: ['name'],  // only select doctor name
        },
      ],
    });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching bills by patient name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Book appointment
export async function bookAppointment(req, res) {
  const { patientId, doctorId, date, time } = req.body;

  console.log('Book appointment request received with data:', req.body);

  if (!patientId || !doctorId || !date || !time) {
    console.warn('Missing required fields:', { patientId, doctorId, date, time });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if doctor exists
    console.log(`Checking doctor existence for ID: ${doctorId}`);
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      console.warn(`Doctor with ID ${doctorId} not found`);
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Check doctor availability
    /*console.log(`Doctor availability status: ${doctor.availability}`);
      if (doctor.availability !== 'available') {
      console.warn(`Doctor with ID ${doctorId} is not available`);
      return res.status(400).json({ error: 'Doctor is not available' });
    }*/

    // Check for time conflicts
    console.log(`Checking for conflicting appointments for doctor ${doctorId} on ${date} at ${time}`);
    const conflict = await Appointment.findOne({
      where: {
        doctorId,
        date,
        time
      }
    });

    if (conflict) {
      console.warn('Conflict found: time slot already booked');
      return res.status(409).json({ error: 'Selected time slot is already booked' });
    }

    // Create the appointment
    console.log('Creating new appointment...');
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      time,
      status: 'pending'
    });

    console.log('Appointment booked successfully:', appointment);
    res.status(201).json({ message: 'Appointment booked successfully', appointment });

  } catch (err) {
    console.error('Error booking appointment:', err.stack || err);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
}

// Get notifications for a patient
export async function getNotifications(req, res) {
  let { patientName } = req.params;

  if (!patientName || !patientName.trim()) {
    return res.status(400).json({ error: 'Patient name is required' });
  }

  patientName = patientName.trim(); // Remove extra spaces

  try {
    const patients = await Patient.findAll({
      where: {
        name: {
          [Op.like]: `%${patientName}%`  // Try changing this to [Op.iLike] if using Postgres
        }
      },
      attributes: ['id', 'name']
    });

    if (patients.length === 0) {
      return res.status(404).json({ error: `No patients found with name like '${patientName}'` });
    }

    const patientIds = patients.map(p => p.id);

    const notifications = await PatientsNotification.findAll({
      where: {
        patientId: {
          [Op.in]: patientIds
        }
      },
      order: [['createdAt', 'DESC']]
    });

    if (notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found for the given patient(s)' });
    }

    res.json(notifications);

  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
}


// Submit feedback (optional)
export async function getAppointmentsPatientName(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Patient name is required' });
  }

  try {
    // Find patients matching the name (partial match)
    const patients = await Patient.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    });

    if (patients.length === 0) {
      return res.status(404).json({ error: 'No patients found with this name' });
    }

    const patientIds = patients.map(p => p.id);

    // Fetch appointments for these patients including doctor info AND patient info
    const appointments = await Appointment.findAll({
      where: {
        patientId: patientIds
      },
      include: [
        { model: Doctor, attributes: ['id', 'name'] },
        { model: Patient, attributes: ['id', 'name'] }  // <-- Include Patient model here
      ],
      order: [['appointmentDate', 'DESC']]
    });

    res.json({ appointments });
  } catch (err) {
    console.error('Error fetching appointments by patient name:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}



// Submit feedback
export async function submitFeedback(req, res) {
  const { patientId, doctorId, appointmentId, message, rating } = req.body;

  if (!patientId || !doctorId || !appointmentId || !message) {
    return res.status(400).json({ error: 'patientId, doctorId, appointmentId and message are required' });
  }

  try {
  console.log('Creating feedback with:', { patientId, doctorId, appointmentId, message, rating });

  const feedback = await Feedback.create({
    patientId,
    doctorId,
    appointmentId,
    message,
    rating: rating || null,
  });

  res.status(201).json({ message: 'Feedback submitted successfully', feedback });
} catch (err) {
  console.error('Error submitting feedback:', err); // Full stack trace
  res.status(500).json({ error: 'Failed to submit feedback' });
} 
}

export async function populateNotifications() {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Patient, attributes: ['id', 'name'] },
        { model: Doctor, attributes: ['id', 'name'] },
        {
          model: Bill,
          attributes: ['amount', 'status'],
          required: false
        }
      ]
    });

    for (const appt of appointments) {
      const notificationExists = await PatientsNotification.findOne({
        where: { appointmentId: appt.id }
      });

      if (!notificationExists) {
        await PatientsNotification.create({
          patientId: appt.Patient.id,
          patientName: appt.Patient.name,
          appointmentId: appt.id,
          appointmentDate: appt.date,
          appointmentTime: appt.time,
          appointmentStatus: appt.status,
          billAmount: appt.Bill ? appt.Bill.amount : null,
          billStatus: appt.Bill ? appt.Bill.status : 'Not Generated',
          doctorId: appt.Doctor.id,
          doctorName: appt.Doctor.name
        });
      }
    }

    console.log('Notifications populated successfully.');
  } catch (err) {
    console.error('Error populating notifications:', err);
  }
}
