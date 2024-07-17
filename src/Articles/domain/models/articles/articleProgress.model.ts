import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { ChapterProgress } from "./chapterProgress.model";
import { Article } from "./article.model";
import { ArticleProgressAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'


export class ArticleProgress
  extends Model<ArticleProgressAttributes>
  implements ArticleProgressAttributes
{
  id!: string;
  articleID!: string;
  chapterProgressID!: string;
  startTime!: string;
  timeSpentOnArticle!: number;
}

ArticleProgress.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    articleID: {
      type: DataTypes.UUID,
      references: {
        model: "articles",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    chapterProgressID: {
      type: DataTypes.UUID,
      references: {
        model: "chapterProgress",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    startTime: {
      type: DataTypes.TIME,
      // defaultValue: 0,
    },
    timeSpentOnArticle: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: connect,
    tableName: "articleProgress",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

ArticleProgress.belongsTo(Article, { foreignKey: "articleID" });
ArticleProgress.belongsTo(ChapterProgress, { foreignKey: "chapterProgressID" });

// (async () => {
// void connect.sync()

// console.log('Patient Table synced successfully')
// })()
// 