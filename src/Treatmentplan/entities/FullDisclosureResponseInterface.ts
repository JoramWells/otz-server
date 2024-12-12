import { FullDisclosureAttributes } from "otz-types";

export interface FullDisclosureResponseInterface {
  data: FullDisclosureAttributes[];
  total: number;
  page: number;
  pageSize: number;
}
