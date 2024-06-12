import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface AppointmentStatusAttributes {
  id: string;
  statusDescription: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AppointmentStatus
  extends Model<AppointmentStatusAttributes>
  implements AppointmentStatusAttributes
{
  id!: string
  statusDescription!: string
  createdAt: Date | undefined
  updatedAt: Date | undefined
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
