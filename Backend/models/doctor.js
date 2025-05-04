import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Doctor = sequelize.define('Doctor', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  specialization: { type: DataTypes.STRING, allowNull: false },
  availability: { type: DataTypes.JSON, allowNull: true },
  experience: { type: DataTypes.INTEGER, allowNull: true },
  salary: { type: DataTypes.FLOAT, allowNull: true },
  role: { type: DataTypes.STRING, defaultValue: 'doctor' }
});

export default Doctor;





