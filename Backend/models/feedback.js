import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Patient from './patient.js';
import Doctor from './doctor.js';

const Feedback = sequelize.define('Feedback', {
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
});

Feedback.belongsTo(Patient, { foreignKey: 'patientId' });
Feedback.belongsTo(Doctor, { foreignKey: 'doctorId' });

export default Feedback;

