/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('./patients.models');

const Caregiver = sequelize.define('caregivers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // defaultValue: UUIDV4,
  },
  patientID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'patients',
      key: 'id',
    },
    onDelete: 'CASCADE',
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
    type: DataTypes.ENUM('MALE', 'FEMALE'),
  },
  dob: {
    type: DataTypes.DATE,
  },
  idNo: {
    type: DataTypes.STRING,
  },
  phoneNo: {
    type: DataTypes.STRING,
  },
  relationship: {
    type: DataTypes.STRING,
  },
  locationID: {
    type: DataTypes.STRING,
  },
  drugs: {
    type: DataTypes.STRING,
  },
  career: {
    type: DataTypes.STRING,
  },
  hivStatus: {
    type: DataTypes.STRING,
  },
  maritalStatus: {
    type: DataTypes.STRING,
  },
});

Caregiver.belongsTo(Patient, { foreignKey: 'patientID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Caregiver Table synced Successfully');
// })();

module.exports = Caregiver;
