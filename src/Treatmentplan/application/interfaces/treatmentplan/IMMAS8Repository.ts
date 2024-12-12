import { MMASEightAttributes, MMASFourAttributes } from "otz-types";
import { MMASEightResponseInterface } from "../../../entities/MMASResponseInterface";

export interface IMMASEightRepository {
  create: (
    data4: MMASFourAttributes,
    data: MMASEightAttributes
  ) => Promise<MMASEightAttributes>;
  find: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery?: string
  ) => Promise<MMASEightResponseInterface | null | undefined>;
  findById: (id: string) => Promise<MMASEightAttributes | null | undefined>;
  findByVisitId: (
    id: string
  ) => Promise<MMASEightAttributes | null | undefined>;
  findByPatientId: (
    id: string
  ) => Promise<MMASEightAttributes | null | undefined>;
  // count: () => Promise<MMASEightAttributes | null>;
}
