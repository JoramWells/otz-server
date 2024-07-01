import { UserNotificationAttributes } from "otz-types";

export interface IUserNotificationInteractor {
  createUserNotification: (data: UserNotificationAttributes) => Promise<UserNotificationAttributes>;
  getAllUserNotifications: () => Promise<UserNotificationAttributes[]>;
  getUserNotificationById: (id: string) => Promise<UserNotificationAttributes | null>;
}
