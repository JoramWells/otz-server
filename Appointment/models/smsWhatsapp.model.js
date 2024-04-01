/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4, Sequelize } = require('sequelize');
const sequelize = require('../../db/connect');
const Appointment = require('./appointment.model');

const SMSWhatsapp = sequelize.define('SMSWhatsapp', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  appointmentID: {
    type: DataTypes.UUID,
    references: {
      model: 'appointments',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  notificationType: {
    type: DataTypes.STRING,
  },
  phoneNo: {
    type: DataTypes.STRING,
  },
  messageText: {
    type: DataTypes.STRING,
  },
  scheduledDate: {
    type: DataTypes.DATEONLY,
  },
  scheduledTime: {
    type: DataTypes.TIME,
    defaultValue: Sequelize.literal('CURRENT_TIME'),
    timezone: false,
  },
});

SMSWhatsapp.belongsTo(Appointment, { foreignKey: 'appointmentID', targetKey: 'id' });

SMSWhatsapp.afterUpdate(async () => {
  console.log('@@@@@@');
});

// (async () => {
//   await sequelize.sync();
//   console.log('Appointments D Table synced successfully');
// })();

module.exports = SMSWhatsapp;
