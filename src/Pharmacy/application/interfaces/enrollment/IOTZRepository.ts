import { OTZEnrollmentsInterface } from "otz-types";
export interface IOTZRepository {
  create: (data: OTZEnrollmentsInterface) => Promise<OTZEnrollmentsInterface>
  find: (hospitalID: string) => Promise<OTZEnrollmentsInterface[] | null>
  findById: (id: string) => Promise<OTZEnrollmentsInterface | null>
}
