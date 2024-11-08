/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

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
  idNo: {
    type: DataTypes.STRING,
  },
  sex: {
    type: DataTypes.STRING,
  },
  phoneNo: {
    type: DataTypes.STRING,
  },
  countyID: {
    type: DataTypes.INTEGER,
  },
  dob: {
    type: DataTypes.DATE,
  },
  password: {
    type: DataTypes.STRING,
  },
  hospitalID: {
    type: DataTypes.UUID,
    references: {
      model: 'hospitals',
      key: 'id',
    },
    // allowNull: false,
    onDelete: 'CASCADE',
  },
}, { timestamps: false });
// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();
module.exports = User;
