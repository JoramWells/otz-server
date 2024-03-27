/* eslint-disable no-console */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const ArtCategory = require('./artCategory.model');
const MeasuringUnit = require('./measuringUnit.model');

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
    
    measuringUnitID: {
      type: DataTypes.UUID,
      references: {
        model: 'measuringUnits',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true },
);

ART.belongsTo(ArtCategory, { foreignKey: 'artCategoryID' });
ART.belongsTo(MeasuringUnit, { foreignKey: 'measuringUnitID' });

// (async () => {
//   await sequelize.sync();
//   console.log('ART Categorygt Table synced Successfully');
// })();

module.exports = ART;
