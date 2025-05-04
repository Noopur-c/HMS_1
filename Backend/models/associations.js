import Doctor from './doctor.js';
import Department from './department.js';
import Patient from './patient.js';
import Appointment from './appointment.js';
import Bill from './bill.js';
import Feedback from './feedback.js';
import Notification from './notification.js';
import Treatment from './treatment.js';

// --- Doctor & Department ---
Doctor.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
Department.hasMany(Doctor, { foreignKey: 'departmentId', as: 'doctors' });

// --- Appointment with Patient and Doctor ---
Appointment.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Patient.hasMany(Appointment, { foreignKey: 'patientId', as: 'appointments' });

Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Doctor.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });

// --- Bill for Appointment (1-to-1) ---
Bill.belongsTo(Appointment, { foreignKey: 'appointmentId', as: 'appointment' });
Appointment.hasOne(Bill, { foreignKey: 'appointmentId', as: 'bill' });

// --- Feedback for Appointment (1-to-1) ---
Feedback.belongsTo(Appointment, { foreignKey: 'appointmentId', as: 'appointment' });
Appointment.hasOne(Feedback, { foreignKey: 'appointmentId', as: 'feedback' });

// --- Treatment for Appointment (1-to-1) ---
Treatment.belongsTo(Appointment, { foreignKey: 'appointmentId', as: 'appointment' });
Appointment.hasOne(Treatment, { foreignKey: 'appointmentId', as: 'treatment' });

// --- Notification for Patient (many-to-one) ---
Notification.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Patient.hasMany(Notification, { foreignKey: 'patientId', as: 'notifications' });


