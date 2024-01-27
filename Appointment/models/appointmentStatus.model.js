/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const AppointmentStatus = sequelize.define('appointmentStatus', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  statusDescription: {
    type: DataTypes.STRING,
  },
});

module.exports = AppointmentStatus;
