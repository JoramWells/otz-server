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
  id!: string;
  eventTypeID!: string;
  patientID!: string;
  createdAt!: string;
  updateAt!: number;
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
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
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


// void connect.sync({alter:true})
// console.log('Patient Table synced successfully')
