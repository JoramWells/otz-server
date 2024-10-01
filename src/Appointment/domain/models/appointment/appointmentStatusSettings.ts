import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'
import { AppointmentStatusAttributes } from "otz-types";
import { User } from "../user.model";

export enum AppointmentStatusPriority {
  High = "upcoming",
  Low = "pending",
  Medium = "missed",
}

export class AppointmentStatusSettings
  extends Model<AppointmentStatusAttributes>
  implements AppointmentStatusAttributes
{
  id!: string;
  statusDescription!: string;
  status!: AppointmentStatusPriority;
  color: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

AppointmentStatusSettings.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    color: {
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
    tableName: "appointmentStatusSettings",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

AppointmentStatusSettings.belongsTo(User, {
  foreignKey: "userID",
  targetKey: "id",
});

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
