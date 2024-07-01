import { MMASEightAttributes, MMASFourAttributes } from "otz-types";

export interface IMMASEightRepository {
  create: (data4:MMASFourAttributes, data: MMASEightAttributes) => Promise<MMASEightAttributes>;
  find: () => Promise<MMASEightAttributes[]>;
  findById: (id: string) => Promise<MMASEightAttributes | null>;
  findByPatientId: (id: string) => Promise<MMASEightAttributes | null>;
  // count: () => Promise<MMASEightAttributes | null>;
}
