import { NotificationAttributes } from "otz-types";

export interface NotificationResponseInterface {
  data: NotificationAttributes[];
  total: number;
  page: number;
  pageSize: number;
}
