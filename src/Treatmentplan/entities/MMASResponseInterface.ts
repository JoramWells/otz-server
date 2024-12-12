import { MMASEightAttributes, MMASFourAttributes } from "otz-types";

export interface PaginatedResponse<T> {
  data: T[];
  total?: string | number ;
  page?: string | number ;
  pageSize?: string | number ;
}
export type MMASFourResponseInterface = PaginatedResponse<MMASFourAttributes> 

export type MMASEightResponseInterface = PaginatedResponse<MMASEightAttributes>

