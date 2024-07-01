import { NotificationTypeAttributes } from "otz-types";

export interface INotificationTypeInteractor {
  createNotificationType: (data: NotificationTypeAttributes) => Promise<NotificationTypeAttributes>;
  getAllNotificationTypes: () => Promise<NotificationTypeAttributes[]>;
  getNotificationTypeById: (id: string) => Promise<NotificationTypeAttributes | null>;
}
