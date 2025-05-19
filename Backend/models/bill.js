import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Appointment from './appointment.js';

const Bill = sequelize.define('Bill', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'unpaid'  // Could be 'unpaid' or 'paid'
  },
  generatedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Bill.belongsTo(Appointment, { foreignKey: 'appointmentId' });

export default Bill;

