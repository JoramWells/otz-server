import { MMASFourAttributes } from "otz-types";
import { MMASFourResponseInterface } from "../../../entities/MMASResponseInterface";

export interface IMMASFourRepository {
  create: (data: MMASFourAttributes) => Promise<MMASFourAttributes>;
  find: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery?: string
  ) => Promise<MMASFourResponseInterface | null | undefined>;
  findById: (id: string) => Promise<MMASFourAttributes | null | undefined>;
  findByVisitId: (
    visitID: string
  ) => Promise<MMASFourAttributes | null | undefined>;
  findByPatientId: (
    id: string
  ) => Promise<MMASFourAttributes | null | undefined>;
  // count: () => Promise<MMASFourAttributes | null>;
}
