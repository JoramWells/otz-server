/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../db/connect');

const AppointmentAgenda = sequelize.define('appointmentAgendas', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  agendaDescription: {
    type: DataTypes.STRING,
  },
});

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = AppointmentAgenda;
