import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { connect } from "../../../db/connect";
import { Patient } from "../patients.models";
import { AppointmentMessageAttributes } from "otz-types";
import { Appointment } from "./appointment.model";


export class AppointmentMessage
  extends Model<AppointmentMessageAttributes>
  implements AppointmentMessageAttributes
{
  id: string | undefined;
  chatID: string | undefined;
  text: string | undefined;
  senderID: string | undefined;
}


AppointmentMessage.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    appointmentID: {
      type: DataTypes.UUID,
      references: {
        model: "chats",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    senderID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "appointmentMessages",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

AppointmentMessage.belongsTo(Appointment,{foreignKey:'appointmentID'})
Appointment.hasMany(AppointmentMessage, {foreignKey:'appointmentID'})
AppointmentMessage.belongsTo(Patient ,{ foreignKey: "senderID" });

(async () => {
await connect.sync()
console.log('Appointment Table synced successfully')
})()
