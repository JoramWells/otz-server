import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { NotificationSubCategory } from "./notificationSubCategory.model";
import { NotificationAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'



export class Notification
  extends Model<NotificationAttributes>
  implements NotificationAttributes
{
  id!: string;
  notificationSubCategoryID!: string;
  notificationDescription!: string;
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    notificationSubCategoryID: {
      type: DataTypes.UUID,
      references: {
        model: "notificationSubCategories",
        key: "id",
      },
    },
    notificationDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "notifications",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Notification.belongsTo(NotificationSubCategory,{foreignKey:'notificationSubCategoryID'})

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
