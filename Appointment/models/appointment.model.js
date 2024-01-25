/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');

const Appointment = sequelize.define('appointments', {
  appointment_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patient_id: {
    type: DataTypes.UUID,
  },
  user_id: {
    type: DataTypes.UUID,
  },
  appointmentDate: {
    type: DataTypes.STRING,
  },
  agenda: {
    type: DataTypes.STRING,
  },
});

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = Appointment;
