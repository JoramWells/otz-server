import { OTZEnrollmentsInterface } from "otz-types";
import { OTZResponseInterface } from "../../../domain/models/enrollment/otz.model";
export interface IOTZRepository {
  create: (data: OTZEnrollmentsInterface) => Promise<OTZEnrollmentsInterface>;
  find: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<OTZResponseInterface | null>;
  findById: (id: string) => Promise<OTZEnrollmentsInterface | null>;
  delete: (id: string) => Promise<number | null>;
}
