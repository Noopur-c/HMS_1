import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Department = sequelize.define('Department', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
});

export default Department;



