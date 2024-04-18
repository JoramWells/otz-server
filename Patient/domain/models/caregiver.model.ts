/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize'
const sequelize = require('../db/connect')

const Caregiver = sequelize.define('caregivers', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
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
  sex: {
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
  },
  maritalStatus: {
    type: DataTypes.STRING
  }
})

// sequelize.sync()
// console.log('User Table synced successfully')

module.exports = Caregiver
