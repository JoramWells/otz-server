/* eslint-disable camelcase */
const {DataTypes} = require('sequelize');
const sequelize = require('../db/connect');
const Patient = require('./patients.models');

const Art_regimen = sequelize.define('art_regimens', {
  art_regimen_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  date_confirmed_positive: {
    type: DataTypes.STRING,
  },
  enrollment_date: {
    type: DataTypes.STRING,
  },
  patient_id: {
    type: DataTypes.INTEGER,
  },
  art_start_date: {
    type: DataTypes.STRING,
  },
  first_regimen: {
    type: DataTypes.STRING,
  },
  current_regimen: {
    type: DataTypes.STRING,
  },
  current_regimen_line: {
    type: DataTypes.STRING,
  },
  baseline_cd4: {
    type: DataTypes.STRING,
  },
  date_of_baseline_cd4_test: {
    type: DataTypes.STRING,
  },
  latest_cd4_count: {
    type: DataTypes.STRING,
  },
  latest_cd4_count_date: {
    type: DataTypes.STRING,
  },
});

Patient.belongsTo(Art_regimen, {foreignKey: 'patient_id'});

module.exports = Art_regimen;
