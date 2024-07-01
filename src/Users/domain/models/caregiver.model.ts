/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../db/connect'
import { Patient } from './patients.models'
import { CaregiverInterface } from 'otz-types'


export class Caregiver extends Model<CaregiverInterface> {
  firstName!: string
  middleName!: string
  phoneNo!: string
  sex!: string
  dob!: string
  idNo!: string
  countyID!: string
  careerID!: string
  patientID!: string
  maritalStatus!: string
  relationship!: string
  email: string | undefined
}

Caregiver.init(
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
    countyID: {
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
    sequelize: connect,

    tableName: 'caregivers'
  }
)

Caregiver.belongsTo(Patient, { foreignKey: 'patientID' })

// sequelize.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
