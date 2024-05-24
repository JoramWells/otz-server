import { NotificationSubCategoryAttributes } from "../../models/notify/notificationSubCategory.model";

export class NotificationSubCategoryEntity
  implements NotificationSubCategoryAttributes
{
  constructor(
    public id: string,
    public notificationCategoryID: string,
    public notificationSubCategoryName: string
  ) {}
}
