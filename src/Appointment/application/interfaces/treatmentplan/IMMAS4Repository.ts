import { MMASFourAttributes } from "otz-types";

export interface IMMASFourRepository {
  create: (data: MMASFourAttributes) => Promise<MMASFourAttributes>;
  find: (hospitalID: string) => Promise<MMASFourAttributes[] | null>;
  findById: (id: string) => Promise<MMASFourAttributes | null | undefined>;
  findByPatientId: (id: string) => Promise<MMASFourAttributes | null | undefined>;
  // count: () => Promise<MMASFourAttributes | null>;
}
