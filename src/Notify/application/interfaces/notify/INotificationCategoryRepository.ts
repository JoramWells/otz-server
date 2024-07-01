import { NotificationCategoryAttributes } from "otz-types";

export interface INotificationCategoryRepository {
  create: (data: NotificationCategoryAttributes ) => Promise<NotificationCategoryAttributes>;
  find: () => Promise<NotificationCategoryAttributes[]>;
  findById: (id: string) => Promise<NotificationCategoryAttributes | null>;
}
