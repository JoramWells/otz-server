/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize';
const sequelize = require('../db/connect');

const PMTCTDelivery = sequelize.define(
  "pmtctDelivery",
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
    pregnancyOutcome: {
      type: DataTypes.STRING,
    },
    dateOfDelivery: {
      type: DataTypes.DATE,
    },
    placeOfDelivery: {
      type: DataTypes.STRING,
    },
    modeOfDelivery: {
      type: DataTypes.STRING,
    },
    isInfantAlive: {
      type: DataTypes.STRING,
    },
    motherStartedOnFP: {
      type: DataTypes.STRING,
    },
    indicatedTypeOfMethod: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = PMTCTDelivery;
