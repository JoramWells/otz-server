/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');

const Art_detail = sequelize.define('art_details', {
  art_detail_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  art_description: {
    type: DataTypes.DATE,
  },
  art_category_id: {
    type: DataTypes.UUID,
  },
  art_regimen_phase_id: {
    type: DataTypes.UUID,
  },
});


module.exports = Art_detail;
