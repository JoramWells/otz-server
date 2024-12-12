import { DisclosureChecklistAttributes } from "otz-types";

export interface IDisclosureChecklistRepository {
  create: (
    data: DisclosureChecklistAttributes
  ) => Promise<DisclosureChecklistAttributes>;
  find: (hospitalID: string) => Promise<DisclosureChecklistAttributes[] | null>;
  findById: (id: string) => Promise<DisclosureChecklistAttributes | null>;
  findByVisitId: (id: string) => Promise<DisclosureChecklistAttributes | null | undefined>;
  findAllByVisitId: (
    id: string
  ) => Promise<DisclosureChecklistAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
