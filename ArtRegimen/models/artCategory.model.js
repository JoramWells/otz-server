/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');
const Art_regimen_phase = require('./artRegimenPhases.model');

const art_category = sequelize.define('art_categories', {
  art_category_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  art_category_description: {
    type: DataTypes.STRING,
  },
  art_regimen_phase_id: {
    type: DataTypes.UUID,
  },
});

art_category.belongsTo(Art_regimen_phase,
    {foreignKey: 'art_regimen_phase_id'});

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = art_category;
