import { PartialDisclosureAttributes } from "otz-types";
import { PartialDisclosureResponseInterface } from "../../../../entities/PartialDisclosureResponseInterface";

export interface IPartialDisclosureRepository {
  create: (
    data: PartialDisclosureAttributes
  ) => Promise<PartialDisclosureAttributes>;
  find: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ) => Promise<PartialDisclosureResponseInterface | null | undefined>;
  findById: (id: string) => Promise<PartialDisclosureAttributes | null>;
  findByPatientId: (
    patientID: string
  ) => Promise<PartialDisclosureAttributes | null | undefined>;
  findAllByVisitId: (
    id: string
  ) => Promise<PartialDisclosureAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
