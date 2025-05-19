// Import existing Sequelize instance
import sequelize from '../config/db.js';

// Import all models
import Department from './department.js';
import Doctor from './doctor.js';
import Patient from './patient.js';
import Appointment from './appointment.js';
import Treatment from './treatment.js';
import Bill from './bill.js';
import Feedback from './feedback.js';
import Notification from './notification.js';
import Admin from './admin.js';
import PatientsNotification from './patientsNotification.js';

// Associations

// Department - Doctor
Doctor.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Doctor, { foreignKey: 'departmentId' });

// Patient - Appointment
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasMany(Appointment, { foreignKey: 'patientId' });

// Doctor - Appointment
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });

// Appointment - Treatment
Treatment.belongsTo(Appointment, { foreignKey: 'appointmentId' });
Appointment.hasOne(Treatment, { foreignKey: 'appointmentId' });

// Appointment - Bill
Bill.belongsTo(Appointment, { foreignKey: 'appointmentId' });
Appointment.hasOne(Bill, { foreignKey: 'appointmentId' });

// Appointment - Feedback
Feedback.belongsTo(Appointment, { foreignKey: 'appointmentId' });
Appointment.hasOne(Feedback, { foreignKey: 'appointmentId' });

PatientsNotification.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasMany(PatientsNotification, { foreignKey: 'patientId' });

PatientsNotification.belongsTo(Doctor, { foreignKey: 'doctorId' });
Doctor.hasMany(PatientsNotification, { foreignKey: 'doctorId' });

PatientsNotification.belongsTo(Appointment, { foreignKey: 'appointmentId' });
Appointment.hasMany(PatientsNotification, { foreignKey: 'appointmentId' });

// Export everything
export {
  sequelize,
  Department,
  Doctor,
  Patient,
  Appointment,
  Treatment,
  Bill,
  Feedback,
  Notification,
  Admin,
  PatientsNotification
};
