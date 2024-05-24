import { NotificationEntity } from "../../../domain/entities/notify/NotificationEntity";

export interface INotificationInteractor {
  createNotification: (data: NotificationEntity) => Promise<NotificationEntity>;
  getAllNotifications: () => Promise<NotificationEntity[]>;
  getNotificationById: (id: string) => Promise<NotificationEntity | null>;
}
