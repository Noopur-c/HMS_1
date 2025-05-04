import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Appointment = sequelize.define('Appointment', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'scheduled' }
});

export default Appointment;


