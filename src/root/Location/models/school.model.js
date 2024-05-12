/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const School = sequelize.define('schools', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // defaultValue: UUIDV4,
  },
  schoolName: {
    type: DataTypes.STRING,
  },
  region: {
    type: DataTypes.STRING,
  },
  countyName: {
    type: DataTypes.STRING,
  },

  subCountyName: {
    type: DataTypes.STRING,
  },
  ward: {
    type: DataTypes.STRING,
  },
  division: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  subLocation: {
    type: DataTypes.STRING,
  },
  level: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  sponsor: {
    type: DataTypes.STRING,
  },

  longitude: {
    type: DataTypes.STRING,
  },
  latitude: {
    type: DataTypes.STRING,
  },
  noClassrooms: {
    type: DataTypes.STRING,
  },
}, { timestamps: false });

// (async () => {
//   await sequelize.sync();
//   console.log('LOCATION Table synced successfully');
// })();

module.exports = School;
