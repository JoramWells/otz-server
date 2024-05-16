/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize';
const sequelize = require('../db/connect');

const OTZResults = sequelize.define(
  "otzResults",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4,
    },
    otzProfileID: {
      type: DataTypes.UUID,
    },
    vlResults: {
      type: DataTypes.STRING,
    },
    dateOfVL: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: false }
);

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = OTZResults;
