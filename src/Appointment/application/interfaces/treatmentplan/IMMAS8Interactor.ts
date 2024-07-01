import { MMASEightAttributes, MMASFourAttributes } from "otz-types";

export interface IMMASEightInteractor {
  createMMASEight: (data4:MMASFourAttributes,data: MMASEightAttributes) => Promise<MMASEightAttributes>;
  getAllMMASEight: () => Promise<MMASEightAttributes[]>;
  getMMASEightById: (id: string) => Promise<MMASEightAttributes | null>;
  getMMASEightByPatientId: (id: string) => Promise<MMASEightAttributes | null>;
  // getDailyMMASCount: () => Promise<MMASEightAttributes | null>;
}
