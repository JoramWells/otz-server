/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const MeasuringUnit = sequelize.define('measuringUnits', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  description: {
    type: DataTypes.STRING,
  },
},{timestamps:true});

// (async () => {
//   await sequelize.sync();
//   console.log('County Tables synced successfully');
// })();

module.exports = MeasuringUnit;
