import { NotificationAttributes } from "otz-types";
import { NotificationResponseInterface } from "../../../entitties/notify/NotificationResponseInterface";

export interface INotificationRepository {
  create: (data: NotificationAttributes) => Promise<NotificationAttributes>;
  find: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<NotificationResponseInterface | null>;
  findById: (id: string) => Promise<NotificationAttributes | null>;
}
