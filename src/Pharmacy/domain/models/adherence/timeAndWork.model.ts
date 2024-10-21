import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect'
import { Patient } from '../patients.models'
import { PatientVisits } from '../patientVisits.model'
import { TimeAndWorkAttributes } from 'otz-types'



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
  createdAt: Date | undefined
  updatedAt!: Date | undefined
}

TimeAndWork.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      allowNull: false,
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
        key: "id",
      },
      allowNull: false,
    },
    wakeUpTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    departureHomeTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    arrivalWorkTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    departureWorkTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    arrivalHomeTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    morningPlace: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    morningMedicineTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    eveningPlace: {
      type: DataTypes.STRING,
    },
    eveningMedicineTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    medicineStorage: {
      type: DataTypes.STRING,
    },
    toolsAndCues: {
      type: DataTypes.STRING,
    },
    goal: {
      type: DataTypes.STRING,
    },
    morningWeekendPlace: {
      type: DataTypes.STRING,
    },
    eveningWeekendPlace: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: connect,
    tableName: "timeAndWork",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

TimeAndWork.belongsTo(Patient, { foreignKey: 'patientID' })
TimeAndWork.belongsTo(PatientVisits, { foreignKey: 'patientVisitID' })

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
