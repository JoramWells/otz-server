import { DataTypes, UUIDV4 } from "sequelize";
const SchoolTerm = require('../models/schoolTerm.model')
/* eslint-disable camelcase */
const sequelize = require('../db/connect');

const SchoolTermHoliday = sequelize.define(
  "schoolTermHolidays",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4,
    },
    schoolTermID: {
      type: DataTypes.STRING,
    },
    termHolidayDescription: {
      type: DataTypes.STRING,
    },
    openingDate: {
      type: DataTypes.DATE,
    },
    closingDate: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

SchoolTermHoliday.belongsTo(SchoolTerm, { foreignKey: "schoolTermID" });

// (async () => {
//   await sequelize.sync();
//   console.log("SchoolSubCategory Table synced successfully");
// })();

module.exports = SchoolTermHoliday;
