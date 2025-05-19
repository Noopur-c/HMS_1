import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Patient from './patient.js';
import Doctor from './doctor.js';

const Treatment = sequelize.define('Treatment', {
  diagnosis: {
    type: DataTypes.STRING,
    allowNull: false
  },
  treatmentDetails: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  prescription: {
    type: DataTypes.TEXT
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Treatment.belongsTo(Patient, { foreignKey: 'patientId' });
Treatment.belongsTo(Doctor, { foreignKey: 'doctorId' });

export default Treatment;


