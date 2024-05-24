import { NotificationTypeEntity } from "../../../domain/entities/notify/NotificationTypeEntity";

export interface INotificationTypeRepository {
  create: (data: NotificationTypeEntity ) => Promise<NotificationTypeEntity>;
  find: () => Promise<NotificationTypeEntity[]>;
  findById: (id: string) => Promise<NotificationTypeEntity | null>;
}
