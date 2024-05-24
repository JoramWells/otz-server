import { NotificationAttributes } from "../../models/notify/notification.model";

export class NotificationEntity implements NotificationAttributes {
  constructor(
    public id: string,
    public notificationSubCategoryID: string,
    public notificationDescription: string
  ) {}
}
