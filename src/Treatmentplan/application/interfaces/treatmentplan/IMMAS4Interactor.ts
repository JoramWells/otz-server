import { MMASFourAttributes } from "otz-types";
import { MMASFourResponseInterface } from "../../../entities/MMASResponseInterface";

export interface IMMASFourInteractor {
  createMMASFour: (data: MMASFourAttributes) => Promise<MMASFourAttributes>;
  getAllMMASFour: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery?: string
  ) => Promise<MMASFourResponseInterface | null | undefined>;
  getMMASFourById: (
    id: string
  ) => Promise<MMASFourAttributes | null | undefined>;
  getMMASFourByVisitId: (
    visitID: string
  ) => Promise<MMASFourAttributes | null | undefined>;
  getMMASFourByPatientId: (
    id: string
  ) => Promise<MMASFourAttributes | null | undefined>;
  // getDailyMMASCount: () => Promise<MMASFourAttributes | null>;
}
