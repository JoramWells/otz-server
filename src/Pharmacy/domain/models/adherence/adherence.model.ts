import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect'
import { TimeAndWork } from './timeAndWork.model'
import { Prescription } from '../art/prescription.model'
import { AdherenceAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'


export class Adherence extends Model<AdherenceAttributes> implements AdherenceAttributes {
  id: string | undefined
  timeAndWorkID!: string
  prescriptionID!: string
  currentDate!: Date
  morningStatus!: boolean
  eveningStatus!: boolean
}

Adherence.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    timeAndWorkID: {
      type: DataTypes.UUID,
      references: {
        model: 'timeAndWork',
        key: 'id'
      }
    },
    prescriptionID: {
      type: DataTypes.UUID,
      references: {
        model: 'prescriptions',
        key: 'id'
      }
    },
    currentDate: {
      type: DataTypes.DATE
    },
    morningStatus: {
      type: DataTypes.BOOLEAN
    },
    eveningStatus: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize: connect,
    tableName: 'uptake',
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true
  }
)

Adherence.belongsTo(Prescription, { foreignKey: 'prescriptionID' })
Adherence.belongsTo(TimeAndWork, { foreignKey: 'timeAndWorkID' })

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
