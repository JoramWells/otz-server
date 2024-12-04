import { VitalSignsInterface } from "otz-types";

export interface VitalSignResponseInterface {
  data: VitalSignsInterface[];
  total: number;
  page: number;
  pageSize: number;
}
