/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');
const ArtRegimenPhase = require('./artRegimenPhases.model');

const ArtCategory = sequelize.define('artCategories', {
  art_category_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  artCategoryDescription: {
    type: DataTypes.STRING,
  },
  art_regimen_phase_id: {
    type: DataTypes.UUID,
    references: {
      model: 'artRegimenPhases',
      key: 'art_regimen_phase_id',
    },
    onDelete: 'CASCADE',
  },
});

ArtCategory.belongsTo(ArtRegimenPhase,
    {foreignKey: 'art_regimen_phase_id'});

// (async () => {
//   await sequelize.sync();
//   console.log('ART Category Table synced successfully');
// })();

module.exports = ArtCategory;
