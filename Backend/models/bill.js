import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Bill = sequelize.define('Bill', {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  details: { type: DataTypes.TEXT, allowNull: true },
  dateIssued: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
});

export default Bill;

