/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../db/connect');
const ArtRegimenPhase = require('./artRegimenPhases.model');

const ArtCategory = sequelize.define('artCategories', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  artCategoryDescription: {
    type: DataTypes.STRING,
  },
  artPhaseID: {
    type: DataTypes.UUID,
    references: {
      model: 'artRegimenPhases',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

ArtCategory.belongsTo(
  ArtRegimenPhase,
  { foreignKey: 'artPhaseID' },
);

// (async () => {
//   await sequelize.sync();
//   console.log('ART Category Table synced Successfully');
// })();

module.exports = ArtCategory;
