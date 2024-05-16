/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../db/connect'
import { Patient } from './patients.models'

export interface AdverseDrugReactionsInterface {
  id: string
  patientID: string
  medicine: string
  reaction: string
  severity: string
  onSetDate: Date
  actionTaken: string
}

export class AdverseDrugReactions extends Model<AdverseDrugReactionsInterface> {
  id!: string
  patientID!: string
  medicine!: string
  reaction!: string
  actionTaken!: string
  severity!: number
  onSetDate!: Date
}

AdverseDrugReactions.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    medicine: {
      type: DataTypes.STRING
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: 'patients',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    reaction: {
      type: DataTypes.STRING
    },
    actionTaken: {
      type: DataTypes.STRING
    },
    severity: {
      type: DataTypes.STRING
    },
    onSetDate: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize: connect,

    tableName: 'arts'
  }
)

AdverseDrugReactions.belongsTo(Patient, { foreignKey: 'patientID' })

// sequelize.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
