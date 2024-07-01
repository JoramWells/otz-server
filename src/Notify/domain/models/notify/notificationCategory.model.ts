import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { NotificationCategoryAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'


export class NotificationCategory
  extends Model<NotificationCategoryAttributes>
  implements NotificationCategoryAttributes
{
  id!: string;
  notificationDescription!: string;
}

NotificationCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    notificationDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "notificationCategories",
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
