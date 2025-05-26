import Admin from './admin.js';
import Appointment from './appointment.js';
import Bill from './bill.js';
import Department from './department.js';
import Doctor from './doctor.js';
import Feedback from './feedback.js';
import Notification from './notification.js';
import Patient from './patient.js';
import Treatment from './treatment.js';

// Example associations
Doctor.belongsTo(Department, { foreignKey: 'departmentId' });
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.hasOne(Bill, { foreignKey: 'appointmentId' });
Patient.hasMany(Feedback, { foreignKey: 'patientId' });
Doctor.hasMany(Feedback, { foreignKey: 'doctorId' });
Appointment.belongsTo(Patient);
Appointment.belongsTo(Doctor);
Treatment.belongsTo(Appointment);
Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

Appointment.belongsTo(Doctor, { as: 'Doctor', foreignKey: 'doctorId' });

// Bill model
Bill.belongsTo(Appointment, { foreignKey: 'appointmentId' });

// Doctor model associations
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });

// Patient model associations
Patient.hasMany(Appointment, { foreignKey: 'patientId' });

Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'Doctor' });


export { Admin, Appointment, Bill, Department, Doctor, Feedback, Notification, Patient, Treatment };