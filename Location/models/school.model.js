/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const School = sequelize.define('schools', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    // defaultValue: UUIDV4,
  },
  objectID: {
    type: DataTypes.STRING,
  },

  code: {
    type: DataTypes.STRING,
  },
  schoolName: {
    type: DataTypes.STRING,
  },
  level: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },

  countyName: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
  },
  zone: {
    type: DataTypes.STRING,
  },
  subCountyName: {
    type: DataTypes.STRING,
  },

  ward: {
    type: DataTypes.STRING,
  },
  X_Coord: {
    type: DataTypes.STRING,
  },
  Y_Coord: {
    type: DataTypes.STRING,
  },
  source: {
    type: DataTypes.STRING,
  },
},{timestamps:false});

// (async () => {
//   await sequelize.sync();
//   console.log('LOCATION Table synced successfully');
// })();

module.exports = School;
