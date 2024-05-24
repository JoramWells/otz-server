import { NotificationEntity } from "../../../domain/entities/notify/NotificationEntity";

export interface INotificationRepository {
  create: (data: NotificationEntity) => Promise<NotificationEntity>;
  find: () => Promise<NotificationEntity[]>;
  findById: (id: string) => Promise<NotificationEntity | null>;
}
