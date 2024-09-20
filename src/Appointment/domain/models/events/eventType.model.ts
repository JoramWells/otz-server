import { DataTypes, Model, UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { User } from "../user.model";
import { EventTypeAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'

export class EventType
  extends Model<EventTypeAttributes>
  implements EventTypeAttributes
{
  id!: string;
  title!: string;
  description!: string;
  duration!: number;
  eventDate!: Date;
  startTime!: string;
  createdAt!: string;
  updateAt!: number;
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
