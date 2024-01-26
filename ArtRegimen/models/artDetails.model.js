/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');
const ArtCategory = require('./artCategory.model');

const ART = sequelize.define('arts', {
  artID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  artName: {
    type: DataTypes.STRING,
  },
  art_category_id: {
    type: DataTypes.UUID,
    references: {
      model: 'artCategories',
      key: 'art_category_id',
    },
    onDelete: 'CASCADE',

  },
},
{timestamps: true},
);

ART.belongsTo(ArtCategory, {foreignKey: 'art_category_id'});

// (async () => {
//   await sequelize.sync();
//   console.log('ART Table synced successfully');
// })();

module.exports = ART;
