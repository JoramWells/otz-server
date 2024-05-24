import { UserNotificationEntity } from "../../../domain/entities/notify/UserNotificationEntity.model";

export interface IUserNotificationInteractor {
  createUserNotification: (data: UserNotificationEntity) => Promise<UserNotificationEntity>;
  getAllUserNotifications: () => Promise<UserNotificationEntity[]>;
  getUserNotificationById: (id: string) => Promise<UserNotificationEntity | null>;
}
