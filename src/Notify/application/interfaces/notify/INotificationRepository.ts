import { NotificationAttributes } from "otz-types";

export interface INotificationRepository {
  create: (data: NotificationAttributes) => Promise<NotificationAttributes>;
  find: () => Promise<NotificationAttributes[]>;
  findById: (id: string) => Promise<NotificationAttributes | null>;
}
