/* eslint-disable camelcase */
const {DataTypes} = require('sequelize');
const sequelize = require('../db/connect');

const Art_regimen = sequelize.define('art_regimens', {
  art_regimen_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  enrollment_date: {
    type: DataTypes.DATE,
  },
  patient_id: {
    type: DataTypes.UUID,
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


module.exports = Art_regimen;
