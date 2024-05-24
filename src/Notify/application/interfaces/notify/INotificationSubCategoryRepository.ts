import { NotificationSubCategoryEntity } from "../../../domain/entities/notify/NotificationSubCategoryEntity";

export interface INotificationSubCategoryRepository {
  create: (data: NotificationSubCategoryEntity ) => Promise<NotificationSubCategoryEntity>;
  find: () => Promise<NotificationSubCategoryEntity[]>;
  findById: (id: string) => Promise<NotificationSubCategoryEntity | null>;
}
