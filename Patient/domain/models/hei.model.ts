/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize';
const sequelize = require('../db/connect');

const HEI = sequelize.define(
  "hei",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4,
    },
    dateOfEnrollment: {
      type: DataTypes.DATE,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    sex: {
      type: DataTypes.STRING,
    },
    birth: {
      type: DataTypes.ENUM("MALE", "FEMALE"),
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    phoneNo: {
      type: DataTypes.STRING,
    },
    idNo: {
      type: DataTypes.STRING,
    },
    nupi: {
      type: DataTypes.STRING,
    },
    residence: {
      type: DataTypes.STRING,
    },
    // mflCode: {
    //   type: DataTypes.STRING,
    // },
    // cccNo: {
    //   type: DataTypes.STRING,
    // },
  },
  { timestamps: false }
);

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = HEI;
