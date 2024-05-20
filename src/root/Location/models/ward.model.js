/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const SubCounty = require('./subCounty.model');

const Ward = sequelize.define('wards', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // defaultValue: UUIDV4,
    autoIncrement: true,
  },

  subCountyID: {
    type: DataTypes.INTEGER,
  },
  ward: {
    type: DataTypes.STRING,
  },
});

Ward.belongsTo(SubCounty, { foreignKey: 'subCountyID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Ward Table synced successfull');
// })();

module.exports = Ward;
