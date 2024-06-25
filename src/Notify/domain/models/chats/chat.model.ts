import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { connect } from "../../../db/connect";

export interface ChatAttributes {
  id?: string;
  messages?: string;
  members?: string[];
}

export class Chat
  extends Model<ChatAttributes>
  implements ChatAttributes
{
  id?: string | undefined;
  messages?: string | undefined;
  members!: string[];
}

Chat.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    messages:{
      type: DataTypes.STRING
    },
  },
  {
    sequelize: connect,
    tableName: "chats",
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
