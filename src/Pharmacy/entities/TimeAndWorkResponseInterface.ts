import { TimeAndWorkAttributes } from "otz-types";

export interface TimeAndWorkResponseInterface {
  data: TimeAndWorkAttributes[];
  total?: string | number;
  page?: string | number;
  pageSize?: string | number;
}
