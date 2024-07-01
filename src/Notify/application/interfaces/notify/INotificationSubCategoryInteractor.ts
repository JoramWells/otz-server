import { NotificationSubCategoryAttributes } from "otz-types";

export interface INotificationSubCategoryInteractor {
  createNotificationSubCategory: (data: NotificationSubCategoryAttributes) => Promise<NotificationSubCategoryAttributes>;
  getAllNotificationSubCategories: () => Promise<NotificationSubCategoryAttributes[]>;
  getNotificationSubCategoryById: (id: string) => Promise<NotificationSubCategoryAttributes | null>;
}
