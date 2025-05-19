import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  dob: {
    type: DataTypes.DATE
  },
  gender: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  }
});

export default Patient;


