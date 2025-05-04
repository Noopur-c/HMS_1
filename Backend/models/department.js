import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Department = sequelize.define('Department', {
  name: { type: DataTypes.STRING, allowNull: false }
});

export default Department;



