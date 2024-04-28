/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize';
const sequelize = require('../db/connect');

const OTZARTSwitch = sequelize.define(
  "otzARTSwitch",
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
    regimenLine: {
      type: DataTypes.STRING,
    },
    dateOfSwitch: {
      type: DataTypes.DATE,
    },
    reason: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = OTZARTSwitch;
