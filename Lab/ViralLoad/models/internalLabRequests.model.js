/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('./patient/patients.models');
// const Hospital = require('../../Hospital/models/hospital.model');

const InternalLabRequest = sequelize.define('internalLabRequests', {
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
  },
  specimenType: {
    type: DataTypes.STRING,
  },
  testName: {
    type: DataTypes.STRING,
  },
  urgency: {
    type: DataTypes.STRING,
  },
  normalValues: {
    type: DataTypes.STRING,
  },
  dateRequested: {
    type: DataTypes.DATE,
  },
  reason: {
    type: DataTypes.STRING,
  },
  results: {
    type: DataTypes.STRING,
  },
  resultDate: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },

  // CD4

});

InternalLabRequest.belongsTo(Patient, { foreignKey: 'patientID' });
// InternalLabRequests.belongsTo(Hospital, { foreignKey: 'hospitalID' });

(async () => {
  await sequelize.sync();
  console.log('Lab Requests Table synced successfull');
})();

module.exports = InternalLabRequest;
