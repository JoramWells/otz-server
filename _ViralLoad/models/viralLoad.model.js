/* eslint-disable camelcase */
const {DataTypes} = require('sequelize');
const sequelize = require('../../_Patient/db/connect');
const Patient = require('../../_Patient/models/patients.models');

const ViralLoad = sequelize.define('viralload', {
  viral_load_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  vl_result: {
    type: DataTypes.STRING,
  },
  vl_validity: {
    type: DataTypes.STRING,
  },
  patient_id: {
    type: DataTypes.INTEGER,
  },
  vl_justification: {
    type: DataTypes.STRING,
  },
  last_vl_date: {
    type: DataTypes.STRING,
  },
});

Patient.belongsTo(ViralLoad, {foreignKey: 'patient_id'});


module.exports = ViralLoad;
