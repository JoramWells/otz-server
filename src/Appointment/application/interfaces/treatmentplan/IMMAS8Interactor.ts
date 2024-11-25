import { MMASEightAttributes, MMASFourAttributes } from "otz-types";

export interface IMMASEightInteractor {
  createMMASEight: (
    data4: MMASFourAttributes,
    data: MMASEightAttributes
  ) => Promise<MMASEightAttributes>;
  getAllMMASEight: (hospitalID: string) => Promise<MMASEightAttributes[] | null>;
  getMMASEightById: (id: string) => Promise<MMASEightAttributes | null>;
  getMMASEightByPatientId: (id: string) => Promise<MMASEightAttributes | null>;
  // getDailyMMASCount: () => Promise<MMASEightAttributes | null>;
}
