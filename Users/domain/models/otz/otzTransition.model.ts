/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize';
const sequelize = require('../db/connect');

const OTZTransition = sequelize.define(
  "otzTransition",
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
    outcomes: {
      type: DataTypes.STRING,
    },
    dateOfTransition: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: false }
);

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = OTZTransition;
