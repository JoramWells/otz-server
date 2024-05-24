import { NotificationCategoryAttributes } from "../../models/notify/notificationCategory.model";

export class NotificationCategoryEntity implements NotificationCategoryAttributes {
  constructor(
    public id: string,
    public notificationDescription: string
  ) {}
}
