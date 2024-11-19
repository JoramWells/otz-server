/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../../db/connect'
import { Patient } from '../../patients.models'


export interface MedicalSurgicalHistoryAttributes {
  id?: string
  pmtctProfileID: string
  surgicalOperation: string
  isDiabetic: boolean
  isHypertensive: boolean
  isBloodTransfusion: boolean
  isTB: boolean
  allergy: boolean
  twins: boolean
}

export class MedicalSurgicalHistory
  extends Model<MedicalSurgicalHistoryAttributes>
  implements MedicalSurgicalHistoryAttributes {
  id?: string | undefined
  pmtctProfileID!: string
  surgicalOperation!: string
  isDiabetic: boolean = false
  isHypertensive: boolean = false
  isBloodTransfusion: boolean = false
  isTB: boolean = false
  allergy: boolean = false
  twins: boolean = false
}

MedicalSurgicalHistory.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4
    },
    pmtctProfileID: {
      type: DataTypes.UUID,
      references: {
        model: 'pmtctProfile'
      }
    },
    surgicalOperation: {
      type: DataTypes.DATE
    },
    isDiabetic: {
      type: DataTypes.STRING
    },
    isHypertensive: {
      type: DataTypes.STRING
    },
    isBloodTransfusion: {
      type: DataTypes.STRING
    },
    isTB: {
      type: DataTypes.STRING
    },
    allergy: {
      type: DataTypes.STRING
    },
    twins: {
      type: DataTypes.STRING
    }

  },
  {
    sequelize: connect,
    tableName: 'MedicalSurgicalHistory'
  }
)

MedicalSurgicalHistory.belongsTo(Patient, { foreignKey: 'patientID' })
