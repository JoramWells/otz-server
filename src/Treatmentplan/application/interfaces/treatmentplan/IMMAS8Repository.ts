import { MMASEightAttributes, MMASFourAttributes } from "otz-types";

export interface IMMASEightRepository {
  create: (
    data4: MMASFourAttributes,
    data: MMASEightAttributes
  ) => Promise<MMASEightAttributes>;
  find: (hospitalID: string) => Promise<MMASEightAttributes[] | null>;
  findById: (id: string) => Promise<MMASEightAttributes | null | undefined>;
  findByVisitId: (id: string) => Promise<MMASEightAttributes | null | undefined>;
  findByPatientId: (
    id: string
  ) => Promise<MMASEightAttributes | null | undefined>;
  // count: () => Promise<MMASEightAttributes | null>;
}
