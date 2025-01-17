import { Model, UUIDV4, DataTypes } from 'sequelize'
import { connect } from '../../../db/connect'
import { Patient } from '../patients.models'
import { ARTPrescriptionInterface } from 'otz-types'



export class ARTPrescription extends Model<ARTPrescriptionInterface> {
  id!: string
  patientID!: string
  regimen!: string
  changeReason!: string
  stopReason!: string
  startDate!: Date
  stopDate!: Date
  changeDate!: Date
  isStandard!: string
  line!: string
}

ARTPrescription.init(
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
    regimen: {
      type: DataTypes.STRING
    },
    startDate: {
      type: DataTypes.DATE
    },
    isStandard: {
      type: DataTypes.BOOLEAN
    },
    line: {
      type: DataTypes.STRING
    },
    changeReason: {
      type: DataTypes.STRING
    },
    stopReason: {
      type: DataTypes.STRING
    },
    changeDate: {
      type: DataTypes.DATE
    },
    stopDate: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize: connect,
    tableName: 'artPrescriptions'
  }
)

ARTPrescription.belongsTo(Patient, { foreignKey: 'patientID' })

// (async () => {
// connect.sync()
// console.log('ART Categorygt Table synced Successfully')
// })();
