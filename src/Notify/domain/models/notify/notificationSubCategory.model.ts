import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { NotificationCategory } from "./notificationCategory.model";
import { NotificationSubCategoryAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'



export class NotificationSubCategory
  extends Model<NotificationSubCategoryAttributes>
  implements NotificationSubCategoryAttributes
{
  id!: string;
  notificationCategoryID!: string;
  notificationSubCategoryName!: string;
}

NotificationSubCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    notificationCategoryID: {
      type: DataTypes.UUID,
      references: {
        model: "notificationCategories",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    notificationSubCategoryName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "notificationSubCategories",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

NotificationSubCategory.belongsTo(NotificationCategory, {foreignKey:'notificationCategoryID'})

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
