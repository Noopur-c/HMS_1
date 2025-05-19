import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Department from './department.js';

const Doctor = sequelize.define('Doctor', {
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
  specialization: {
    type: DataTypes.STRING
  },
  availability: {
    type: DataTypes.STRING
  },
  experience: {
    type: DataTypes.INTEGER
  },
  salary: {
    type: DataTypes.FLOAT
  }
});

Doctor.belongsTo(Department, { foreignKey: 'departmentId' });
export default Doctor;





