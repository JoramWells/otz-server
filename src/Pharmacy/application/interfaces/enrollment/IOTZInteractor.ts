import { OTZEnrollmentsInterface } from "otz-types";

export interface IOTZInteractor {
  createOTZ: (data: OTZEnrollmentsInterface) => Promise<OTZEnrollmentsInterface>
  getAllOTZs: () => Promise<OTZEnrollmentsInterface[]>
  getOTZById: (id: string) => Promise<OTZEnrollmentsInterface | null>
}
