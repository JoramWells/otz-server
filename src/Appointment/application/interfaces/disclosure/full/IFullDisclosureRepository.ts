import { FullDisclosureAttributes } from "otz-types";

export interface IFullDisclosureRepository {
  create: (data: FullDisclosureAttributes) => Promise<FullDisclosureAttributes>;
  find: (hospitalID: string) => Promise<FullDisclosureAttributes[] | null>;
  findById: (id: string) => Promise<FullDisclosureAttributes | null>;
  findByPatientId: (id: string) => Promise<FullDisclosureAttributes | null | undefined>;
  findAllByVisitId: (id: string) => Promise<FullDisclosureAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
