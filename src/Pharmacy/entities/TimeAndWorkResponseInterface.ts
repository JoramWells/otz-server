import { TimeAndWorkAttributes } from "otz-types";

export interface TimeAndWorkResponseInterface {
  data: TimeAndWorkAttributes[];
  total: number;
  page: number;
  pageSize: number;
}
