import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { Patient } from "../patients.models";
import { User } from "../user.model";
import { PatientNotificationAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'


export class PatientNotification
  extends Model<PatientNotificationAttributes>
  implements PatientNotificationAttributes
{
  id?: string;
  patientID!: string;
  medicineTime!: string;
  userID!: string;
  message!: string;
}

PatientNotification.init(
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
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: true,
    },
    medicineTime: {
      type: DataTypes.TIME,
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "patientNotifications",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

PatientNotification.belongsTo(Patient, {foreignKey:'patientID'})
PatientNotification.belongsTo(User, {foreignKey:'userID'})

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
