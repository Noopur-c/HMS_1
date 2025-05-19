import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

  const PatientsNotification = sequelize.define('PatientsNotification', {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    patientName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    appointmentTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    appointmentStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    billAmount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    billStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    doctorName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'patientsNotification',
    timestamps: true
  });

  export default PatientsNotification;

