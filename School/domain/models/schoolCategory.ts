import { DataTypes, UUIDV4 } from "sequelize";

/* eslint-disable camelcase */
const sequelize = require('../db/connect');

const SchoolCategory = sequelize.define(
  "schoolCategories",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: UUIDV4,
    },
    categoryDescription: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = SchoolCategory;
