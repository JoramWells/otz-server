import { NotificationTypeEntity } from "../../../domain/entities/notify/NotificationTypeEntity";

export interface INotificationTypeInteractor {
  createNotificationType: (data: NotificationTypeEntity) => Promise<NotificationTypeEntity>;
  getAllNotificationTypes: () => Promise<NotificationTypeEntity[]>;
  getNotificationTypeById: (id: string) => Promise<NotificationTypeEntity | null>;
}
