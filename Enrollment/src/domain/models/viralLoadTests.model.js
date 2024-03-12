/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../db/connect');
// const Patient = require('../../Patient/models/patients.models');
const ART = require('./arts/art.model');
const Patient = require('./patients/patients.models');
const ArtRegimenPhase = require('./arts/artRegimenPhases.model');

const ViralLoadTests = sequelize.define('viralLoadTests', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // defaultValue: UUIDV4,
    autoIncrement: true,
  },
  patientID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
  dateOfVL: {
    type: DataTypes.DATE,
  },
  vlCopies: {
    type: DataTypes.STRING,
  },
});


ViralLoadTests.belongsTo(Patient, { foreignKey: 'patientID', targetKey: 'id' });

// (async () => {
//   await sequelize.sync();
//   console.log('Viral Load Results Table synced successfully');
// })();

module.exports = ViralLoadTests;
