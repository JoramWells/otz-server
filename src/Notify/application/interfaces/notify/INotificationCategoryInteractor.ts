import { NotificationCategoryAttributes } from "otz-types";

export interface INotificationCategoryInteractor {
  createNotificationCategory: (data: NotificationCategoryAttributes) => Promise<NotificationCategoryAttributes>;
  getAllNotificationCategories: () => Promise<NotificationCategoryAttributes[]>;
  getNotificationCategoryById: (id: string) => Promise<NotificationCategoryAttributes | null>;
}
