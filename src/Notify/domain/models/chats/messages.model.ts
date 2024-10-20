import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { connect } from "../../../db/connect";
import { Chat } from "./chat.model";
import { Patient } from "../patients.models";
import { MessagesAttributes } from "otz-types";


export enum MessageTypes {
  text = "text",
  doc = "doc",
  image = "image",
  video = "video",
  link = "link",
}

export class Messages
  extends Model<MessagesAttributes>
  implements MessagesAttributes
{
  filePath!: string;
  id: string | undefined;
  chatID: string | undefined;
  text: string | undefined;
  senderID: string | undefined;
  type?: MessageTypes | undefined;
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
    type: {
      type: DataTypes.ENUM(...Object.values(MessageTypes)),
      allowNull: false,
      defaultValue: MessageTypes.text,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
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
Chat.hasMany(Messages, {foreignKey:'chatID'})
Messages.belongsTo(Patient ,{ foreignKey: "senderID" });

// (async () => {
// void connect.sync({alter:true})
// console.log('Patient Table synced successfully')
// })()
