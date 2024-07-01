import { PartialDisclosureAttributes } from "otz-types";

export interface IPartialDisclosureRepository {
  create: (data: PartialDisclosureAttributes) => Promise<PartialDisclosureAttributes>;
  find: () => Promise<PartialDisclosureAttributes[]>;
  findById: (id: string) => Promise<PartialDisclosureAttributes | null>;
  findAllByVisitId: (id: string) => Promise<PartialDisclosureAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
