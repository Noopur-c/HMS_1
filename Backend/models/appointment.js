import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Patient from './patient.js';
import Doctor from './doctor.js';

const Appointment = sequelize.define('Appointment', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'  // could be 'pending', 'approved', 'rejected'
  }
});

Appointment.belongsTo(Patient, { foreignKey: 'patientId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });

export default Appointment;


