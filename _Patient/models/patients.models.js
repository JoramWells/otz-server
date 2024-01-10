/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');

const Patient = sequelize.define('patients', {
  patient_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  middle_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  sex: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.DATE,
  },
  mflcode: {
    type: DataTypes.STRING,
  },
  cccno: {
    type: DataTypes.STRING,
  },
  date_of_enrollment_to_otz: {
    type: DataTypes.DATE,
  },
  art_start_date: {
    type: DataTypes.DATE,
  },
  original_art_regimen: {
    type: DataTypes.STRING,
  },
  // date_confirmed_positive: {
  //   type: DataTypes.DATE,
  // },
});


module.exports = Patient;
