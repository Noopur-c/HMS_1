import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Admin = sequelize.define('Admin', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin' // Admin role
  }
});
export default Admin;
