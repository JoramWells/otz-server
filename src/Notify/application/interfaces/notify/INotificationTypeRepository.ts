import { NotificationTypeAttributes } from "otz-types";

export interface INotificationTypeRepository {
  create: (data: NotificationTypeAttributes ) => Promise<NotificationTypeAttributes>;
  find: () => Promise<NotificationTypeAttributes[]>;
  findById: (id: string) => Promise<NotificationTypeAttributes | null>;
}
