import { FullDisclosureAttributes } from "otz-types";
import { FullDisclosureResponseInterface } from "../../../../entities/FullDisclosureResponseInterface";

export interface IFullDisclosureRepository {
  create: (data: FullDisclosureAttributes) => Promise<FullDisclosureAttributes>;
  find: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ) => Promise<FullDisclosureResponseInterface | null | undefined>;
  findById: (id: string) => Promise<FullDisclosureAttributes | null>;
  findByPatientId: (
    id: string
  ) => Promise<FullDisclosureAttributes | null | undefined>;
  findFullDisclosureScoreCategory: (
    hospitalID: string | undefined
  ) => Promise<FullDisclosureAttributes[] | null | undefined>;
  findAllByVisitId: (id: string) => Promise<FullDisclosureAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
