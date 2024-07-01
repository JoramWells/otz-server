import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { NotificationTypeAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'



export class NotificationType
  extends Model<NotificationTypeAttributes>
  implements NotificationTypeAttributes
{
  id!: string;
  notificationTypeName!: string;
}

NotificationType.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    notificationTypeName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "notificationTypes",
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
