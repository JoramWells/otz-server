/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4, Sequelize } = require('sequelize');
const redis = require('redis');
const sequelize = require('../db/connect');
const Patient = require('./patient/patients.models');
const AppointmentStatus = require('./appointmentStatus.model');
const User = require('./users/user.models');
const AppointmentAgenda = require('./appointmentAgenda.model');

const Appointment = sequelize.define('appointments', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userID: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  appointmentAgendaID: {
    type: DataTypes.UUID,
    references: {
      model: 'appointmentAgendas',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  appointmentStatusID: {
    type: DataTypes.UUID,
    references: {
      model: 'appointmentStatus',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  appointmentDate: {
    type: DataTypes.DATEONLY,
  },

  appointmentTime: {
    type: DataTypes.TIME,
    defaultValue: Sequelize.literal('CURRENT_TIME'),
    timezone: false,
  },
});

Appointment.belongsTo(User, { foreignKey: 'userID', targetKey: 'id' });
Appointment.belongsTo(AppointmentAgenda, { foreignKey: 'appointmentAgendaID', targetKey: 'id' });
Appointment.belongsTo(
  AppointmentStatus,
  { foreignKey: 'appointmentStatusID', targetKey: 'id' },
);
Appointment.belongsTo(Patient, { foreignKey: 'patientID', targetKey: 'id' });

Appointment.afterCreate(async () => {
  const redisClient = redis.createClient({ url: 'redis://redis:6379' });
  await redisClient.connect();
  await redisClient.del('appointmentData');
});

Appointment.afterUpdate(async () => {
  const redisClient = redis.createClient({ url: 'redis://redis:6379' });
  await redisClient.connect();
  await redisClient.del('appointmentData');
});

// (async () => {
//   await sequelize.sync();
//   console.log('Appointments D Table synced successfully');
// })();

module.exports = Appointment;