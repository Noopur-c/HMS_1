import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Treatment = sequelize.define('Treatment', {
  disease: { type: DataTypes.STRING, allowNull: false },
  prescription: { type: DataTypes.TEXT, allowNull: false },
  progress: { type: DataTypes.TEXT, allowNull: true }
});

export default Treatment;


