/* eslint-disable camelcase */
import { DataTypes }  from 'sequelize';
const sequelize = require('../db/connect');

const Patient = sequelize.define(
  "patients",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      // defaultValue: UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    phoneNo: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.UUID,
    },
    idNo: {
      type: DataTypes.STRING,
    },
    cccNo: {
      type: DataTypes.STRING,
    },
    residence: {
      type: DataTypes.STRING,
    },
    artStartDate: {
      type: DataTypes.STRING,
    },
    originalART: {
      type: DataTypes.STRING,
    },
    currentRegimenLine: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

(async () => {
  await sequelize.sync();
  console.log('Patient Table synced successfully');
})();

module.exports = Patient;
