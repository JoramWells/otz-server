import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect'
import { Patient } from '../patients.models'
import { PatientVisits } from '../patientVisits.model'

export interface TimeAndWorkAttributes {
  id: string
  patientID: string
  patientVisitID: string
  wakeUpTime: Date
  departureHomeTime: Date
  arrivalWorkTime: Date
  departureWorkTime: Date
  arrivalHomeTime: Date
  morningPlace: string
  morningMedicineTime: Date
  eveningPlace: string
  eveningMedicineTime: Date
  medicineStorage: string
  toolsAndCues: string
  goal: string
  morningWeekendPlace: string
  eveningWeekendPlace: string
}

export class TimeAndWork
  extends Model<TimeAndWorkAttributes>
  implements TimeAndWorkAttributes {
  id!: string
  patientID!: string
  patientVisitID!: string
  wakeUpTime!: Date
  departureHomeTime!: Date
  arrivalWorkTime!: Date
  departureWorkTime!: Date
  arrivalHomeTime!: Date
  morningPlace!: string
  morningMedicineTime!: Date
  eveningPlace!: string
  eveningMedicineTime!: Date
  medicineStorage!: string
  toolsAndCues!: string
  goal!: string
  morningWeekendPlace!: string
  eveningWeekendPlace!: string
}

TimeAndWork.init(
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
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: 'patientVisits',
        key: 'id'
      }
    },
    wakeUpTime: {
      type: DataTypes.TIME
    },
    departureHomeTime: {
      type: DataTypes.TIME
    },
    arrivalWorkTime: {
      type: DataTypes.TIME
    },
    departureWorkTime: {
      type: DataTypes.TIME
    },
    arrivalHomeTime: {
      type: DataTypes.TIME
    },
    morningPlace: {
      type: DataTypes.STRING
    },
    morningMedicineTime: {
      type: DataTypes.TIME
    },
    eveningPlace: {
      type: DataTypes.STRING
    },
    eveningMedicineTime: {
      type: DataTypes.TIME
    },
    medicineStorage: {
      type: DataTypes.STRING
    },
    toolsAndCues: {
      type: DataTypes.STRING
    },
    goal: {
      type: DataTypes.STRING
    },
    morningWeekendPlace: {
      type: DataTypes.STRING
    },
    eveningWeekendPlace: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: connect,
    tableName: 'timeAndWork',
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true
  }
)

TimeAndWork.belongsTo(Patient, { foreignKey: 'patientID' })
TimeAndWork.belongsTo(PatientVisits, { foreignKey: 'patientVisitID' })

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
