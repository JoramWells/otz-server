import { UserNotificationAttributes } from "otz-types";

export interface IUserNotificationRepository {
  create: (data: UserNotificationAttributes ) => Promise<UserNotificationAttributes>;
  find: () => Promise<UserNotificationAttributes[]>;
  findById: (id: string) => Promise<UserNotificationAttributes | null>;
}
