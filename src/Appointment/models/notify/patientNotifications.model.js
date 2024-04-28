/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const NotificationSubCategory = require('./notificationSubCategory.model');
const Patient = require('../patient/patients.models');
const User = require('../users/user.models');

const PatientNotification = sequelize.define('patientNotifications', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
  userID: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: true,
  },
  medicineTime: {
    type: DataTypes.TIME,
  },
  message: {
    type: DataTypes.STRING,
  },

});

PatientNotification.belongsTo(Patient, { foreignKey: 'patientID' });
PatientNotification.belongsTo(User, { foreignKey: 'userID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Notification Table synced successfully');
// })();

module.exports = PatientNotification;
