/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize';
const sequelize = require('../db/connect');

const PMTCTProfile = sequelize.define(
  "pmtctProfile",
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
    hivStatus: {
      type: DataTypes.STRING,
    },
    disclosedStatus: {
      type: DataTypes.STRING,
    },
    gravidae: {
      type: DataTypes.STRING,
    },
    para: {
      type: DataTypes.STRING,
    },
    lmnp: {
      type: DataTypes.STRING,
    },
    edd: {
      type: DataTypes.STRING,
    },
    syphilisResults: {
      type: DataTypes.STRING,
    },
    syphilisTreated: {
      type: DataTypes.STRING,
    },
    hivCategory: {
      type: DataTypes.STRING,
    },
    pregnancyIntended: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = PMTCTProfile;
