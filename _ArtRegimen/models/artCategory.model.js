/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');
const Patient = require('./patients.models');

const Art_category = sequelize.define('Art_categories', {
  art_category_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  art_category_description: {
    type: DataTypes.DATE,
  },
});

Patient.belongsTo(Art_category, {foreignKey: 'patient_id'});

module.exports = Art_category;
