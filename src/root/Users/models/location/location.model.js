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
  countyCode: {
    type: DataTypes.STRING,
  },

  countyName: {
    type: DataTypes.STRING,
  },
  subCountyCode: {
    type: DataTypes.STRING,
  },
  subCountyName: {
    type: DataTypes.STRING,
  },
});

// (async () => {
//   await sequelize.sync();
//   console.log('LOCATION Table synced successfully');
// })();

module.exports = Location;
