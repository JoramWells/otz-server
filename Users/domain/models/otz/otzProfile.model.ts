/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize';
const sequelize = require('../db/connect');
const Patient = require('../patients.models')

const OTZProfile = sequelize.define(
  "otzProfile",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4,
    },
    patientID: {
      type: DataTypes.INTEGER,
    },
    ageAtEnrollment: {
      type: DataTypes.DATE,
    },
    dateAtEnrollment: {
      type: DataTypes.DATE,
    },
    currentVLLoad: {
      type: DataTypes.STRING,
    },
    vlResults: {
      type: DataTypes.STRING,
    },
    dateDone: {
      type: DataTypes.STRING,
    },
    isVLValid: {
      type: DataTypes.STRING,
    },
    currentART: {
      type: DataTypes.STRING,
    },
    dateARTStarted: {
      type: DataTypes.STRING,
    },
    currentARTRegimenLine: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

OTZProfile.belongsTo(Patient, {foreignKey:'patientID'})

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = OTZProfile;
