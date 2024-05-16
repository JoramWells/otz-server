/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize';
const sequelize = require('../db/connect');

const PMTCTANCTrimesterVisit = sequelize.define(
  "pmtctANCTrimesterVisits",
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
    trimesterLevel: {
      type: DataTypes.STRING,
    },
    gestAge: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = PMTCTANCTrimesterVisit;
