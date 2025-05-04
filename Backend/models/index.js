import sequelize from '../config/db.js';

import Department from './department.js';
import Doctor from './doctor.js';
import Patient from './patient.js';
import Appointment from './appointment.js';
import Treatment from './treatment.js';
import Bill from './bill.js';
import Feedback from './feedback.js';
import Notification from './notification.js';
import Admin from './admin.js';

// Define relationships (clean version)
Doctor.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Doctor, { foreignKey: 'departmentId' });

Appointment.belongsTo(Patient, { foreignKey: 'patientId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });

Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });

Treatment.belongsTo(Appointment, { foreignKey: 'appointmentId' });
Appointment.hasOne(Treatment, { foreignKey: 'appointmentId' });

Bill.belongsTo(Appointment, { foreignKey: 'appointmentId' });
Appointment.hasOne(Bill, { foreignKey: 'appointmentId' });

Feedback.belongsTo(Appointment, { foreignKey: 'appointmentId' });
Appointment.hasOne(Feedback, { foreignKey: 'appointmentId' });

// Export all models
export {
  sequelize,
  Patient,
  Doctor,
  Admin,
  Department,
  Appointment,
  Treatment,
  Bill,
  Feedback,
  Notification
};
