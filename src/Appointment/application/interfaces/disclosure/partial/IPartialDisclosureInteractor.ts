import { PartialDisclosureAttributes } from "otz-types";

export interface IPartialDisclosureInteractor {
  createPartialDisclosure: (
    data: PartialDisclosureAttributes
  ) => Promise<PartialDisclosureAttributes>;
  getAllPartialDisclosure: (
    hospitalID: string
  ) => Promise<PartialDisclosureAttributes[] | null>;
  getPartialDisclosureById: (
    id: string
  ) => Promise<PartialDisclosureAttributes | null>;
  getPartialDisclosureByPatientId: (
    id: string
  ) => Promise<PartialDisclosureAttributes | null | undefined>;
  getAllPartialDisclosureByVisitId: (
    id: string
  ) => Promise<PartialDisclosureAttributes[] | null>;
}
