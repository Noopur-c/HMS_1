import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Patient = sequelize.define('Patient', {
  name: { type: DataTypes.STRING, allowNull: false },
  dob: { type: DataTypes.DATEONLY, allowNull: true },
  gender: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: true }
});

export default Patient;


