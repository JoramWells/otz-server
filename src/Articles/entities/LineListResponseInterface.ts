import { LineListCSVInterface } from "otz-types";

export interface LineListResponseInterface {
  data: LineListCSVInterface[];
  total: number;
  page: number;
  pageSize: number;
}
