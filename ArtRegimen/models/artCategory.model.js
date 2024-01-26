/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');
const ArtRegimenPhase = require('./artRegimenPhases.model');

const ArtCategory = sequelize.define('ArtCategories', {
  art_category_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  artCategoryDescription: {
    type: DataTypes.STRING,
  },
  artRegimenPhaseID: {
    type: DataTypes.UUID,
    references: {
      model: 'ArtRegimenPhases',
      key: 'artRegimenPhaseID',
    },
    onDelete: 'CASCADE',
  },
});

ArtCategory.belongsTo(ArtRegimenPhase,
    {foreignKey: 'artRegimenPhaseID'});

// (async () => {
//   await sequelize.sync();
//   console.log('ART Category Table synced successfully');
// })();

module.exports = ArtCategory;
