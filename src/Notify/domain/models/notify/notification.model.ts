import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { NotificationSubCategory } from "./notificationSubCategory.model";
import { NotificationAttributes } from "otz-types";
import { AppModule } from "../appModules/appModules";
import { User } from "../user.model";
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
      onDelete: "CASCADE",
    },
    notificationDescription: {
      type: DataTypes.STRING,
    },
    isSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isReadBy: {
      type: DataTypes.STRING,
    },
    moduleID: {
      type: DataTypes.UUID,
      references: {
        model: "appModules",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    currentDate: {
      type: DataTypes.DATE,
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
Notification.belongsTo(AppModule, { foreignKey: "moduleID" });
Notification.belongsTo(User, { foreignKey: "userID" });

// (async () => {
connect.sync()
// console.log('Patient Table synced successfully')
// })()
