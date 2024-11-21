import { NotificationAttributes } from "otz-types";

export interface INotificationInteractor {
  createNotification: (data: NotificationAttributes) => Promise<NotificationAttributes>;
  getAllNotifications: (hospitalID: string) => Promise<NotificationAttributes[] | null>;
  getNotificationById: (id: string) => Promise<NotificationAttributes | null>;
}
