/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');

const AppointmentStatus = sequelize.define('appointmentStatus', {
  appointmentStatusID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  statusDescription: {
    type: DataTypes.STRING,
  },
});


// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = AppointmentStatus;
