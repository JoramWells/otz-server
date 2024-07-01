import { DisclosureChecklistAttributes } from "otz-types";

export interface IDisclosureChecklistRepository {
  create: (data: DisclosureChecklistAttributes) => Promise<DisclosureChecklistAttributes>;
  find: () => Promise<DisclosureChecklistAttributes[]>;
  findById: (id: string) => Promise<DisclosureChecklistAttributes | null>;
  findAllByVisitId: (id: string) => Promise<DisclosureChecklistAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
