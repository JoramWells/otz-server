const { DataTypes, UUIDV4 } = require('sequelize');

/* eslint-disable camelcase */
const sequelize = require('../../db/connect');

const SchoolTerm = sequelize.define(
  'schoolTerms',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4,
    },
    termDescription: {
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
  { timestamps: false },
);

// (async () => {
//   await sequelize.sync();
//   console.log("SchoolSubCategory Table synced successfully");
// })();

module.exports = SchoolTerm;
