import { NotificationCategoryEntity } from "../../../domain/entities/notify/NotificationCategoryEntity";

export interface INotificationCategoryRepository {
  create: (data: NotificationCategoryEntity ) => Promise<NotificationCategoryEntity>;
  find: () => Promise<NotificationCategoryEntity[]>;
  findById: (id: string) => Promise<NotificationCategoryEntity | null>;
}
