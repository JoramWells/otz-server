import { MMASEightAttributes, MMASFourAttributes } from "otz-types";

export interface MMASFourResponseInterface {
  data: MMASFourAttributes[];
  total: number;
  page: number;
  pageSize: number;
}

export interface MMASEightResponseInterface {
  data: MMASEightAttributes[];
  total: number;
  page: number;
  pageSize: number;
}
