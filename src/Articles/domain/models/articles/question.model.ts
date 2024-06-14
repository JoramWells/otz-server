import { DataTypes, Model,  Sequelize,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { Article } from "./article.model";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface QuestionAttributes {
  id: string;
  question: string;
  choices: string;
  answer: string;
  articleID: string;
}

export class Question extends Model<QuestionAttributes> implements QuestionAttributes {
  id!: string;
  question!: string;
  choices!: string;
  answer!: string;
  articleID!: string;
}

Question.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    question: {
      type: DataTypes.STRING,
    },
    choices: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    answer: {
      type: DataTypes.STRING,
    },
    articleID: {
      type: DataTypes.UUID,
      references: {
        model: "articles",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: connect,
    tableName: "questions",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Question.belongsTo(Article, {foreignKey:'articleID'})


// (async () => {
// connect.sync()
// console.log('Questions Table synced successfully')
// })()
