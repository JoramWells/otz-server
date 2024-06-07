import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface MessageTextReplyAttributes {
  id: string;
  messageText: string;
}

export class MessageTextReply
  extends Model<MessageTextReplyAttributes>
  implements MessageTextReplyAttributes
{
  id!: string;
  messageText!: string;
}

MessageTextReply.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    messageText: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "messagesTextReplies",
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
