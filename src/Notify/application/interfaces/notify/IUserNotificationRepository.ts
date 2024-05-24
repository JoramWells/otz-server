import { UserNotificationEntity } from "../../../domain/entities/notify/UserNotificationEntity.model";

export interface IUserNotificationRepository {
  create: (data: UserNotificationEntity ) => Promise<UserNotificationEntity>;
  find: () => Promise<UserNotificationEntity[]>;
  findById: (id: string) => Promise<UserNotificationEntity | null>;
}
