/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from "sequelize";
const sequelize = require("../../db/connect");

const Hospital = sequelize.define(
  'hospitals',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // defaultValue: UUIDV4,
      autoIncrement: true,
      unique: true,
    },
    subCountyID: {
      type: DataTypes.STRING,
    },
    mflCode: {
      type: DataTypes.INTEGER,
    },
    hospitalName: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
);

// (async () => {
//   await sequelize.sync();
//   console.log('Hospital Table synced successfully');
// })();

module.exports = Hospital;
