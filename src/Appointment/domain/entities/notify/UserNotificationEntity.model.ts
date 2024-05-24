import { UserNotificationAttributes } from "../../models/notify/userNotifications.model";

export class UserNotificationEntity implements UserNotificationAttributes {
  constructor(
    public id: string,
    public patientID: string,
    public notificationID: string,
    public notifications: string
  ) {}
}
