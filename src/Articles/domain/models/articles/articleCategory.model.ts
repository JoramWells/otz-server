import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface ArticleCategoryAttributes {
  id: string;
  description: string;
}

export class ArticleCategory
  extends Model<ArticleCategoryAttributes>
  implements ArticleCategoryAttributes
{
  id!: string;
  description!: string;
}

ArticleCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "articleCategories",
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
