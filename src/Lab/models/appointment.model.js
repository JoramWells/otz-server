/* eslint-disable camelcase */
const { DataTypes, UUIDV4, Sequelize } = require('sequelize');
const sequelize = require('../db/connect');

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
  patientVisitID: {
    type: DataTypes.UUID,
    references: {
      model: 'patientVisitID',
      key: 'id',
    },
    onDelete: 'CASCADE',
    unique: true
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


// (async () => {
//   await sequelize.sync();
//   console.log('Appointments D Table synced successfully');
// })();

module.exports = Appointment;
