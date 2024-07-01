import { NotificationAttributes } from "otz-types";

export interface INotificationInteractor {
  createNotification: (data: NotificationAttributes) => Promise<NotificationAttributes>;
  getAllNotifications: () => Promise<NotificationAttributes[]>;
  getNotificationById: (id: string) => Promise<NotificationAttributes | null>;
}
