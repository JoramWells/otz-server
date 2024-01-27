/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../db/connect');
const ArtCategory = require('./artCategory.model');

const ART = sequelize.define(
  'arts',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    artName: {
      type: DataTypes.STRING,
    },
    artCategoryID: {
      type: DataTypes.UUID,
      references: {
        model: 'artCategories',
        key: 'id',
      },
      onDelete: 'CASCADE',

    },
  },
  { timestamps: true },
);

ART.belongsTo(ArtCategory, { foreignKey: 'artCategoryID' });

(async () => {
  await sequelize.sync();
  console.log('ART Category Table synced Successfully');
})();

module.exports = ART;
