import { DataTypes, Model, UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface AppointmentStatusAttributes {
  id: string;
  statusDescription: string;
}

export class AppointmentStatus
  extends Model<AppointmentStatusAttributes>
  implements AppointmentStatusAttributes
{
  id!: string
  statusDescription!: string
}

AppointmentStatus.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    statusDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "appointmentStatus",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
