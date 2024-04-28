const { DataTypes, UUIDV4 } = require('sequelize');
/* eslint-disable camelcase */
const sequelize = require('../../db/connect');
const SchoolTerm = require('./schoolTerm.model');

const SchoolTermHoliday = sequelize.define(
  'schoolTermHolidays',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4,
    },
    schoolTermID: {
      type: DataTypes.UUID,
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
  { timestamps: false },
);

SchoolTermHoliday.belongsTo(SchoolTerm, { foreignKey: 'schoolTermID' });

// (async () => {
//   await sequelize.sync();
//   console.log("SchoolTermHolida Table synced successfully");
// })();

module.exports = SchoolTermHoliday;
