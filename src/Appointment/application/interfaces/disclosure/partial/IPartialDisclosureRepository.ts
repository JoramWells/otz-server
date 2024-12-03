import { PartialDisclosureAttributes } from "otz-types";

export interface IPartialDisclosureRepository {
  create: (
    data: PartialDisclosureAttributes
  ) => Promise<PartialDisclosureAttributes>;
  find: (hospitalID: string) => Promise<PartialDisclosureAttributes[] | null>;
  findById: (id: string) => Promise<PartialDisclosureAttributes | null>;
  findByPatientId: (patientID: string) => Promise<PartialDisclosureAttributes | null | undefined>;
  findAllByVisitId: (
    id: string
  ) => Promise<PartialDisclosureAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
