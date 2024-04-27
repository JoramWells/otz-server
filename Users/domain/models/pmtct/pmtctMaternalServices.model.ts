/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize';
const sequelize = require('../db/connect');

const PMTCTMaternalServices = sequelize.define(
  "pmtctMaternalServices",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4,
    },
    pmtctProfileID: {
      type: DataTypes.UUID,
    },
    pointOfEntry: {
      type: DataTypes.STRING,
    },
    dateArtInitiatedOrDeclined: {
      type: DataTypes.STRING,
    },
    initialRegimen: {
      type: DataTypes.STRING,
    },
    currentRegimen: {
      type: DataTypes.STRING,
    },
    dateInitialVLDoneWithCurrentPregnancy: {
      type: DataTypes.DATE,
    },
    firstVlResults: {
      type: DataTypes.STRING,
    },
    dateSecondVL: {
      type: DataTypes.DATE,
    },
    secondVlResults: {
      type: DataTypes.STRING,
    },
    dateHighVLRepeated: {
      type: DataTypes.DATE,
    },
    highVLResults: {
      type: DataTypes.STRING,
    },
    enhancedAdherenceDone: {
      type: DataTypes.STRING,
    },
    dateOfArtSwitch: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: false }
);

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = PMTCTMaternalServices;
