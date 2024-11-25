import { NotificationAttributes } from "otz-types";
import { NotificationResponseInterface } from "../../../entitties/notify/NotificationResponseInterface";

export interface INotificationInteractor {
  createNotification: (
    data: NotificationAttributes
  ) => Promise<NotificationAttributes>;
  getAllNotifications: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<NotificationResponseInterface | null>;
  getNotificationById: (id: string) => Promise<NotificationAttributes | null>;
}
