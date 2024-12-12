import { MMASEightAttributes, MMASFourAttributes } from "otz-types";
import { MMASEightResponseInterface } from "../../../entities/MMASResponseInterface";

export interface IMMASEightInteractor {
  createMMASEight: (
    data4: MMASFourAttributes,
    data: MMASEightAttributes
  ) => Promise<MMASEightAttributes>;
  getAllMMASEight: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery?: string
  ) => Promise<MMASEightResponseInterface | null | undefined>;
  getMMASEightById: (
    id: string
  ) => Promise<MMASEightAttributes | null | undefined>;
  getMMASEightByVisitId: (
    visitID: string
  ) => Promise<MMASEightAttributes | null | undefined>;
  getMMASEightByPatientId: (
    id: string
  ) => Promise<MMASEightAttributes | null | undefined>;
  // getDailyMMASCount: () => Promise<MMASEightAttributes | null>;
}
