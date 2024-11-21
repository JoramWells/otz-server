import { NotificationAttributes } from "otz-types";

export interface INotificationRepository {
  create: (data: NotificationAttributes) => Promise<NotificationAttributes>;
  find: (hospitalID: string) => Promise<NotificationAttributes[] | null>;
  findById: (id: string) => Promise<NotificationAttributes | null>;
}
