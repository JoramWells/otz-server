import { PartialDisclosureAttributes } from "otz-types";

export interface PartialDisclosureResponseInterface {
  data: PartialDisclosureAttributes[];
  total: number;
  page: number;
  pageSize: number;
}
