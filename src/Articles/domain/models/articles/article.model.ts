import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { User } from "../user.model";
import { ArticleCategory } from "./articleCategory.model";
import { createClient } from "redis";
import { articleCache } from "../../../constants/appointmentCache";
import { Chapter } from "./chapters.model";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface ArticleAttributes {
  id: string;
  userID: string;
  chapterID: string;
  image:string
  content: string;
  title: string
}

export class Article extends Model<ArticleAttributes> implements ArticleAttributes {
  id!: string;
  userID!: string;
  image!: string;
  chapterID!: string;
  content!: string;
  title!: string
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

Article.afterCreate(async()=>{
  const redisClient = createClient({ url: "redis://redis:6379" });
  await redisClient.connect()
  await redisClient.del(articleCache)

  // 
// const results = await Article.findAll({})
// if(results){
//   await redisClient.set(articleCache, JSON.stringify(results))
// }
  
})

Article.afterUpdate(async () => {
  const redisClient = createClient({ url: "redis://redis:6379" });
  await redisClient.connect();
  await redisClient.del(articleCache);

  //
  // const results = await Article.findAll({});
  // if (results) {
  //   await redisClient.set(articleCache, JSON.stringify(results));
  // }
});

// connect.sync()
// console.log('Patient Table synced successfully')
