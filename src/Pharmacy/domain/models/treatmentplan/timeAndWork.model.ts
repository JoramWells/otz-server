import { DataTypes, Model,  Sequelize,  UUIDV4 } from "sequelize";
import { connect } from "../../db/connect";
import { Patient } from "../patients.models";
import { PatientVisits } from "../patientVisits.model";
import { TimeAndWorkAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'


export class TimeAndWork
  extends Model<TimeAndWorkAttributes>
  implements TimeAndWorkAttributes
{
  id!: string;
  patientID!: string;
  patientVisitID!: string;
  wakeUpTime!: string;
  departureHomeTime!: string;
  arrivalWorkTime!: string;
  departureWorkTime!: string;
  arrivalHomeTime!: string;
  morningPlace!: string;
  morningMedicineTime!: string;
  eveningPlace!: string;
  eveningMedicineTime!: string;
  medicineStorage!: string;
  toolsAndCues!: string;
  goal!: string;
  morningWeekendPlace!: string;
  eveningWeekendPlace!: string;
  createdAt: Date | undefined;
  updatedAt!: Date | undefined;
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
      onDelete: 'CASCADE'
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
        key: "id",
      },
      allowNull: false,
      onDelete: 'CASCADE'
    },
    wakeUpTime: {
      type: DataTypes.TIME,
    },
    departureHomeTime: {
      type: DataTypes.TIME,
    },
    arrivalWorkTime: {
      type: DataTypes.TIME,
    },
    departureWorkTime: {
      type: DataTypes.TIME,
    },
    arrivalHomeTime: {
      type: DataTypes.TIME,
    },
    morningPlace: {
      type: DataTypes.STRING,
    },
    morningMedicineTime: {
      type: DataTypes.TIME,
      allowNull: true
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
    indexes: [{ fields: ["patientID"] }, { fields: ["patientVisitID"] }],
  }
);

TimeAndWork.belongsTo(Patient, {foreignKey:'patientID'})
TimeAndWork.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
