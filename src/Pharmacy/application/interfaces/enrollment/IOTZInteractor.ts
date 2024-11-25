import { OTZEnrollmentsInterface } from "otz-types";
import { OTZResponseInterface } from "../../../domain/models/enrollment/otz.model";

export interface IOTZInteractor {
  createOTZ: (
    data: OTZEnrollmentsInterface
  ) => Promise<OTZEnrollmentsInterface>;
  getAllOTZs: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<OTZResponseInterface | null>;
  getOTZById: (id: string) => Promise<OTZEnrollmentsInterface | null>;
  deleteOTZ: (id: string) => Promise<number | null>;
}
