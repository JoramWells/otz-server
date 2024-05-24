import { NotificationSubCategoryAttributes } from "../../models/notify/notificationSubCategory.model";
import { NotificationTypeAttributes } from "../../models/notify/notificationType.model";

export class NotificationTypeEntity implements NotificationTypeAttributes {
  constructor(
    public id: string,
    public notificationCategoryID: string,
    public notificationTypeName: string
  ) {}
}
