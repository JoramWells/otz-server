/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize'
const sequelize = require('../db/connect')
const Patient = require('./patients.models')

const Caregiver = sequelize.define('caregivers', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    // autoIncrement: true,
    defaultValue: UUIDV4
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  firstName: {
    type: DataTypes.STRING
  },
  middleName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.STRING
  },
  dob: {
    type: DataTypes.DATE
  },
  idNo: {
    type: DataTypes.STRING
  },
  phoneNo: {
    type: DataTypes.STRING
  },
  relationship: {
    type: DataTypes.STRING
  },
  locationID: {
    type: DataTypes.STRING
  },
  drugs: {
    type: DataTypes.STRING
  },
  careerID: {
    type: DataTypes.STRING
  }
  // hivStatus: {
  //   type: DataTypes.STRING,
  // },
  // maritalStatus: {
  //   type: DataTypes.STRING,
  // },
})

Caregiver.belongsTo(Patient, { foreignKey: 'patientID' })

// (async () => {
//   await sequelize.sync();
//   console.log('Caregiver Table synced Successfully');
// })();

module.exports = Caregiver
