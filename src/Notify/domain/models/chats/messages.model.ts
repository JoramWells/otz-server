import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { connect } from "../../../db/connect";
import { Chat } from "./chat.model";
import { Patient } from "../patients.models";

export interface MessagesAttributes {
  id?: string;
  chatID?: string;
  text?: string;
  senderID?: string;
}

export class Messages
  extends Model<MessagesAttributes>
  implements MessagesAttributes
{
  id: string | undefined;
  chatID: string | undefined;
  text: string | undefined;
  senderID: string | undefined;
}

Messages.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    chatID: {
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
    tableName: "messages",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Messages.belongsTo(Chat,{foreignKey:'chatID'})
Messages.belongsTo(Patient ,{ foreignKey: "senderID" });

// (async () => {
// void connect.sync({alter:true})
// console.log('Patient Table synced successfully')
// })()
