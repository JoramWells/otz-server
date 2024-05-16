import { Model, UUIDV4, DataTypes } from 'sequelize'
import { connect } from '../db/connect'
import { Patient } from './patients.models'

export interface SystemExaminationInterface {
  id: string
  patientID: string
  appointmentID: string
  bodyPart: string
  findings: string
  notes: string
  isNormal: boolean
}

export class SystemExamination extends Model<SystemExaminationInterface> {
  id!: string
  patientID!: string
  appointmentID!: string
  bodyPart!: string
  findings!: string
  notes!: string
  isNormal!: boolean
}

SystemExamination.init(
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
    appointmentID: {
      type: DataTypes.UUID,
      references: {
        model: 'patients',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    bodyPart: {
      type: DataTypes.STRING
    },
    findings: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.STRING
    },
    isNormal: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize: connect,
    tableName: 'systemExamination'
  }
)

SystemExamination.belongsTo(Patient, { foreignKey: 'patientID' })

// (async () => {
// connect.sync()
// console.log('ART Categorygt Table synced Successfully')
// })();
