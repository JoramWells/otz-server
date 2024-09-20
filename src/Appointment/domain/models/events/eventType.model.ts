import { DataTypes, Model, UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { User } from "../user.model";
import { EventTypeAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'

export class EventType
  extends Model<EventTypeAttributes>
  implements EventTypeAttributes
{
  id?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  duration?: number | undefined;
  eventDate?: Date | undefined;
  startTime?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

EventType.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 15,
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    timeZone: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: connect,
    tableName: "eventTypes",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);


// void connect.sync({alter:true})
// console.log('Patient Table synced successfully')
