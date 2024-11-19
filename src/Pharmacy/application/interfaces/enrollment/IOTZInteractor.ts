import { OTZEnrollmentsInterface } from "otz-types";

export interface IOTZInteractor {
  createOTZ: (data: OTZEnrollmentsInterface) => Promise<OTZEnrollmentsInterface>
  getAllOTZs: (hospitalID: string) => Promise<OTZEnrollmentsInterface[] | null>
  getOTZById: (id: string) => Promise<OTZEnrollmentsInterface | null>
}
