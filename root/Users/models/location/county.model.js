/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../../db/connect');

const County = sequelize.define('counties', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // defaultValue: UUIDV4,
    autoIncrement: true
  },
  countyName: {
    type: DataTypes.STRING,
  },
},{timestamps:false});

// (async () => {
//   await sequelize.sync();
//   console.log('County Tables synced successfully');
// })();

module.exports = County;
