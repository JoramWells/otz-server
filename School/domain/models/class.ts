import { DataTypes, UUIDV4 } from "sequelize";
const SchoolSubCategory = require('../models/schoolSubCategory')
/* eslint-disable camelcase */
const sequelize = require('../db/connect');

const Class = sequelize.define(
  "classes",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4,
    },
    classDescription:{
      type: DataTypes.STRING
    },
    subCategoryID: {
      type: DataTypes.UUID,
    },
  },
  { timestamps: false }
);


Class.belongsTo(SchoolSubCategory, {
  foreignKey: "subCategoryID",
  targetKey: "id",
});

(async () => {
  await sequelize.sync();
  console.log('Classes Table synced successfully');
})();

module.exports = Class;
