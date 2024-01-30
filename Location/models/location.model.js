/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const Location = sequelize.define('locations', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  country: {
    type: DataTypes.STRING,
  },

  province: {
    type: DataTypes.STRING,
  },
  county: {
    type: DataTypes.STRING,
  },
  subCounty: {
    type: DataTypes.STRING,
  },
  residence: {
    type: DataTypes.STRING,
  },
});

// (async () => {
//   await sequelize.sync();
//   console.log('LOCATION Table synced successfully');
// })();

module.exports = Location;
