/* eslint-disable camelcase */
const {DataTypes} = require('sequelize');
const sequelize = require('../db/connect');

const Patient = sequelize.define('patients', {
  patient_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
  },
  secondname: {
    type: DataTypes.STRING,
  },
  sex: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.STRING,
  },
  mflcode: {
    type: DataTypes.STRING,
  },
  cccno: {
    type: DataTypes.STRING,
  },
});


module.exports = Patient;
