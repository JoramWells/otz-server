import { DataTypes, Model, UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { User } from "../user.model";
import {AttendeesAttributes} from 'otz-types'
import { Patient } from "../patients.models";
import { EventType } from "./eventType.model";
// import { type PatientEntity } from '../entities/PatientEntity'

export class Attendee
  extends Model<AttendeesAttributes>
  implements AttendeesAttributes
{
  id?: string | undefined;
  eventTypeID?: string | undefined;
  patientID?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

Attendee.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },

    eventTypeID: {
      type: DataTypes.UUID,
      references: {
        model: "eventTypes",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  {
    sequelize: connect,
    tableName: "attendees",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Attendee.belongsTo(Patient, { foreignKey: "patientID" });
Attendee.belongsTo(EventType, { foreignKey: "eventTypeID" });


connect.sync()
// console.log('Patient Table synced successfully')
