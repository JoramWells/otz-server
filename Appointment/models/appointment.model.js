/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../Patient/models/patients.models');

const Appointment = sequelize.define('appointments', {
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
  appointmentDate: {
    type: DataTypes.DATEONLY,
  },
  appointmentTime: {
    type: DataTypes.TIME,
  },
  agenda: {
    type: DataTypes.STRING,
  },
});

Appointment.belongsTo(Patient, {foreignKey: 'patientID', targetKey: 'id'});


// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = Appointment;
