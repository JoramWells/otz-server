import { OTZEnrollmentsInterface } from "otz-types";
export interface IOTZRepository {
  create: (data: OTZEnrollmentsInterface) => Promise<OTZEnrollmentsInterface>
  find: () => Promise<OTZEnrollmentsInterface[]>
  findById: (id: string) => Promise<OTZEnrollmentsInterface | null>
}
