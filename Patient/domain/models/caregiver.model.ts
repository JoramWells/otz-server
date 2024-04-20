/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
const sequelize = require('../db/connect')

interface CaregiverAttributes {
  id?: string
  patientID: string
  firstName: string
  middleName: string
  lastName?: string
  sex: string
  dob: string
  phoneNo: string
  locationID: string
  drugs: string
  careerID: string
  maritalStatus: string
  idNo: string
  relationship: string
}

export class CaregiverInstance extends Model <CaregiverAttributes> {}

CaregiverInstance.init(
  {
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
  },
  {
    sequelize,

    tableName: 'caregivers'
  }
)

// sequelize.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
