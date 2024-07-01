import { NotificationSubCategoryAttributes } from "otz-types";

export interface INotificationSubCategoryRepository {
  create: (data: NotificationSubCategoryAttributes ) => Promise<NotificationSubCategoryAttributes>;
  find: () => Promise<NotificationSubCategoryAttributes[]>;
  findById: (id: string) => Promise<NotificationSubCategoryAttributes | null>;
}
