import { MMASFourAttributes } from "otz-types";

export interface IMMASFourInteractor {
  createMMASFour: (data: MMASFourAttributes) => Promise<MMASFourAttributes>;
  getAllMMASFour: () => Promise<MMASFourAttributes[]>;
  getMMASFourById: (id: string) => Promise<MMASFourAttributes | null>;
  getMMASFourByPatientId: (id: string) => Promise<MMASFourAttributes | null>;
  // getDailyMMASCount: () => Promise<MMASFourAttributes | null>;
}
