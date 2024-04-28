/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const County = require('./county.model');

const Ward = sequelize.define('wards', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // defaultValue: UUIDV4,
    autoIncrement: true,
  },
  countyID: {
    type: DataTypes.INTEGER,
  },
  subCountyName: {
    type: DataTypes.STRING,
  },
  ward: {
    type: DataTypes.STRING,
  },
}, { timestamps: false });

Ward.belongsTo(County, { foreignKey: 'countyID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Ward Table synced successfull');
// })();

module.exports = Ward;
