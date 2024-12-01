import { MMASFourAttributes } from "otz-types";

export interface IMMASFourInteractor {
  createMMASFour: (data: MMASFourAttributes) => Promise<MMASFourAttributes>;
  getAllMMASFour: (hospitalID: string) => Promise<MMASFourAttributes[] | null>;
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
