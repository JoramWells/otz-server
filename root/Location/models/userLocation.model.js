/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const UserLocation = sequelize.define('locations', {
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
  locationID: {
    type: DataTypes.UUID,
    references: {
      model: 'locations',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

// Appointment.belongsTo(
//   AppointmentStatus,
//   { foreignKey: 'appointmentStatusID', targetKey: 'id' },
// );
// Appointment.belongsTo(Patient, { foreignKey: 'patientID', targetKey: 'id' });

// (async () => {
//   await sequelize.sync();
//   console.log('UserLocation Table synced successfully');
// })();

module.exports = UserLocation;
