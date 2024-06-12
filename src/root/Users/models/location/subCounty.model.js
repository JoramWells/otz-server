/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const County = require('./county.model');

const SubCounty = sequelize.define('subCounties', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // defaultValue: UUIDV4,
    autoIncrement: true
  },
  countyID: {
    type: DataTypes.INTEGER,
  },
  subCountyName:{
    type: DataTypes.STRING
  }
},{timestamps:false});

SubCounty.belongsTo(County,{foreignKey:'countyID'})

// (async () => {
//   await sequelize.sync();
//   console.log('County Tables synced successfully');
// })();

module.exports = SubCounty;
