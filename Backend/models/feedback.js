import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Feedback = sequelize.define('Feedback', {
  rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 }, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: true }
});

export default Feedback;

