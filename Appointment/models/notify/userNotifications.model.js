/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../patient/patients.models');
const Notification = require('./notification.models');
const NotificationType = require('./notifyType.models');

const UserNotifications = sequelize.define('userNotifications', {
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
    onDelete: 'CASCADE',
  },
  notificationID: {
    type: DataTypes.UUID,
    references: {
      model: 'notifications',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  notificationTypeID: {
    type: DataTypes.UUID,
    references: {
      model: 'notificationTypes',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

UserNotifications.belongsTo(Patient, { foreignKey: 'patientID', targetKey: 'id' });
UserNotifications.belongsTo(Notification, { foreignKey: 'notificationID', targetKey: 'id' });
UserNotifications.belongsTo(NotificationType, { foreignKey: 'notificationTypeID' });

// (async () => {
//   await sequelize.sync();
//   console.log('UserNotifications Table synced successfully');
// })();

module.exports = UserNotifications;
