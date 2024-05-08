import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { User } from "../user.model";
import { ArticleCategory } from "./articleCategory.model";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface ArticleAttributes {
  id: string;
  userID: string;
  articleCategoryID: string;
  image:string
  description: string;
}

export class Article extends Model<ArticleAttributes> implements ArticleAttributes {
  id!: string;
  userID!: string;
  image!: string;
  articleCategoryID!: string;
  description!: string;
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
    articleCategoryID: {
      type: DataTypes.UUID,
      references: {
        model: "articleCategories",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
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
Article.belongsTo(ArticleCategory, { foreignKey: "articleCategoryID" });

// connect.sync()
// console.log('Patient Table synced successfully')
