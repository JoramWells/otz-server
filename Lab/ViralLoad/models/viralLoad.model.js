/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../models/patient/patients.models');
// const Hospital = require('../../Hospital/models/hospital.model');

const ViralLoad = sequelize.define('viralLoad', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  vlResults: {
    type: DataTypes.STRING,
  },
  vlValidity: {
    type: DataTypes.STRING,
  },
  isValid: {
    type: DataTypes.STRING,
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
  lastVLJustification: {
    type: DataTypes.STRING,
  },
  dateConfirmedPositive: {
    type: DataTypes.DATEONLY,
  },
  dateOfCurrentVL: {
    type: DataTypes.DATEONLY,
  },
  dateOfNextVL: {
    type: DataTypes.DATEONLY,
  },
  // CD4

});

ViralLoad.belongsTo(Patient, { foreignKey: 'patientID' });
// ViralLoad.belongsTo(Hospital, { foreignKey: 'hospitalID' });

// (async () => {
//   await sequelize.sync();
//   console.log('VL Table synced successfully');
// })();

module.exports = ViralLoad;
