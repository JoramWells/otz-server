import { NotificationCategoryEntity } from "../../../domain/entities/notify/NotificationCategoryEntity";

export interface INotificationCategoryInteractor {
  createNotificationCategory: (data: NotificationCategoryEntity) => Promise<NotificationCategoryEntity>;
  getAllNotificationCategories: () => Promise<NotificationCategoryEntity[]>;
  getNotificationCategoryById: (id: string) => Promise<NotificationCategoryEntity | null>;
}
