import { ViralLoadInterface } from "otz-types";

export interface ViralLoadResponseInterface {
  data: ViralLoadInterface[];
  total: number;
  page: number;
  pageSize: number;
}
