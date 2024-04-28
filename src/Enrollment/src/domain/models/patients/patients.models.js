/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const School = require('../school/school.model');
const Hospital = require('../hospital/hospital.model');

const Patient = sequelize.define(
  'patients',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4,
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
    sex: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    phoneNo: {
      type: DataTypes.STRING,
    },
    occupationID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    idNo: {
      type: DataTypes.STRING,
    },
    cccNo: {
      type: DataTypes.STRING,
    },
    // mflCode: {
    //   type: DataTypes.STRING,
    // },
    // residence: {
    //   type: DataTypes.STRING,
    // },

    ageAtReporting: {
      type: DataTypes.DATE,
    },
    dateConfirmedPositive: {
      type: DataTypes.DATE,
    },
    initialRegimen: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    populationType: {
      type: DataTypes.STRING,
    },
    schoolID: {
      type: DataTypes.INTEGER,
    },
    hospitalID: {
      type: DataTypes.INTEGER,
    },
  },
  {
    postgresql: {
      fillFactor: 70,
    },
    timestamps: true,
  },
);

Patient.belongsTo(School, { foreignKey: 'schoolID' });
Patient.belongsTo(Hospital, { foreignKey: 'hospitalID' });

module.exports = Patient;
