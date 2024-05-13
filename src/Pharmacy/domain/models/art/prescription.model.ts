/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect'
import { Patient } from '../patients.models'
import { ART } from './art.model'

export interface PrescriptionInterface {
  id: string
  patientID: string
  artID: string
  noOfPills: number
  frequency: number
  refillDate: Date
}

export class Prescription extends Model<PrescriptionInterface> {
  id!: string
  patientID!: string
  artID!: string
  noOfPills!: number
  frequency!: number
  refillDate!: Date
}

Prescription.init(
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
      }
    },
    artID: {
      type: DataTypes.UUID
    },
    noOfPills: {
      type: DataTypes.STRING
    },
    frequency: {
      type: DataTypes.INTEGER
    },
    refillDate: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize: connect,

    tableName: 'pills'
  }
)

Prescription.belongsTo(Patient, { foreignKey: 'patientID' })
Prescription.belongsTo(ART, { foreignKey: 'artID' })

// sequelize.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
