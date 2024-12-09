import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
// import { type PatientEntity } from '../entities/PatientEntity'
import { AppointmentStatusAttributes } from "otz-types";
import { connect } from "../../db/connect";

export enum AppointmentStatusDescription {
  Upcoming = "upcoming",
  Pending = "pending",
  Missed = "missed",
  Rescheduled = "rescheduled",
  Cancelled = "cancelled",
}

export class AppointmentStatus
  extends Model<AppointmentStatusAttributes>
  implements AppointmentStatusAttributes
{
  id!: string;
  statusDescription!: string;
  status!: AppointmentStatusDescription;
  color: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
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
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(AppointmentStatusDescription)),
      // unique: true,
      allowNull: false,
      defaultValue: AppointmentStatusDescription.Upcoming,
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
