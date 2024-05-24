import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { Patient } from "../patients.models";
import { Notification } from "./notification.model";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface UserNotificationAttributes {
  id: string;
  patientID: string;
  notificationID: string;
  notifications: string;
}

export class UserNotification
  extends Model<UserNotificationAttributes>
  implements UserNotificationAttributes
{
  id!: string;
  patientID!: string;
  notifications!: string;
  notificationID!: string;
}

UserNotification.init(
  {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  notificationID: {
    type: DataTypes.UUID,
    references: {
      model: 'notifications',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  notifications: {
    type: DataTypes.JSON,
    defaultValue: {
      pushNotification: false,
      sms: false,
      voiceCall: false,
      whatsapp: false,
    },
  },
  },
  {
    sequelize: connect,
    tableName: "userNotifications",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

UserNotification.belongsTo(Patient, {foreignKey:'patientID'})
// UserNotification.belongsTo(Notification, {foreignKey:'userID'})

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
