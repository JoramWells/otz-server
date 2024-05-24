import { NotificationSubCategoryEntity } from "../../../domain/entities/notify/NotificationSubCategoryEntity";

export interface INotificationSubCategoryInteractor {
  createNotificationSubCategory: (data: NotificationSubCategoryEntity) => Promise<NotificationSubCategoryEntity>;
  getAllNotificationSubCategories: () => Promise<NotificationSubCategoryEntity[]>;
  getNotificationSubCategoryById: (id: string) => Promise<NotificationSubCategoryEntity | null>;
}
