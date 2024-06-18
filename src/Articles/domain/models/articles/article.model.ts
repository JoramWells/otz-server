import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { User } from "../user.model";
import { createClient } from "redis";
import { articleCache } from "../../../constants/appointmentCache";
import { Chapter } from "./chapters.model";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface ArticleAttributes {
  id: string;
  userID: string;
  chapterID: string;
  image: string;
  content: string;
  title: string;
  video: string;
}

export class Article extends Model<ArticleAttributes> implements ArticleAttributes {
  id!: string;
  userID!: string;
  image!: string;
  chapterID!: string;
  content!: string;
  title!: string;
  video!: string;
}

Article.init(
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
    },

    chapterID: {
      type: DataTypes.UUID,
      references: {
        model: "chapters",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    image: {
      type: DataTypes.STRING,
    },
    video:{
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "articles",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Article.belongsTo(User, {foreignKey:'userID'})
Article.belongsTo(Chapter, { foreignKey: "chapterID" });



void connect.sync({alter:true})
// console.log('Patient Table synced successfully')
