import { DataTypes, UUIDV4 } from "sequelize";
const SchoolCategory = require('../models/schoolCategory')
/* eslint-disable camelcase */
const sequelize = require('../db/connect');

const SchoolSubCategory = sequelize.define(
  "schoolSubCategories",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: UUIDV4,
    },
    schoolCategoryID:{
      type: DataTypes.UUID
    },
    subCategoryDescription: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);


SchoolSubCategory.belongsTo(SchoolCategory, { foreignKey: "schoolCategoryID", targetKey:'id' });

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = SchoolSubCategory;
