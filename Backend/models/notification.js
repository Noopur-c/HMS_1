import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Notification = sequelize.define('Notification', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Notification;

