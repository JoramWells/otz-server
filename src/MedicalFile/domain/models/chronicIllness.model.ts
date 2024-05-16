/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../db/connect'
import { Patient } from './patients.models'

export interface ChronicIllnessInterface {
  id?: string
  patientID: string
  illness: string
  onSetDate: Date
}

export class ChronicIllness extends Model<ChronicIllnessInterface> {
  patientID!: string
  id!: string
  illness!: string
  onSetDate!: Date
}

ChronicIllness.init(
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
    illness: {
      type: DataTypes.STRING
    },
    onSetDate: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize: connect,

    tableName: 'chronicIllness'
  }
)

ChronicIllness.belongsTo(Patient, { foreignKey: 'patientID' })

// connect.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
