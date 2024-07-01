import { MMASFourAttributes } from "otz-types";

export interface IMMASFourRepository {
  create: (data: MMASFourAttributes) => Promise<MMASFourAttributes>;
  find: () => Promise<MMASFourAttributes[]>;
  findById: (id: string) => Promise<MMASFourAttributes | null>;
  findByPatientId: (id: string) => Promise<MMASFourAttributes | null>;
  // count: () => Promise<MMASFourAttributes | null>;
}
