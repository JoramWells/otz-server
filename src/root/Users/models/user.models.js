/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const County = require('./location/county.model');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  middleName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  phoneNo: {
    type: DataTypes.STRING,
  },
  countyID: {
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING,
  },
});

User.belongsTo(County, { foreignKey: 'countyID' });

// (async () => {
//   await sequelize.sync();
//   console.log('User Table synced successfully');
// })();

module.exports = User;
