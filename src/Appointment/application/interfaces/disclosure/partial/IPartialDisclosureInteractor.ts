import { PartialDisclosureAttributes } from "otz-types";
import { PartialDisclosureResponseInterface } from "../../../../entities/PartialDisclosureResponseInterface";

export interface IPartialDisclosureInteractor {
  createPartialDisclosure: (
    data: PartialDisclosureAttributes
  ) => Promise<PartialDisclosureAttributes>;
  getAllPartialDisclosure: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ) => Promise<PartialDisclosureResponseInterface | null | undefined>;
  getPartialDisclosureById: (
    id: string
  ) => Promise<PartialDisclosureAttributes | null>;
  getPartialDisclosureByPatientId: (
    id: string
  ) => Promise<PartialDisclosureAttributes | null | undefined>;
  getPartialDisclosureScoreCategory: (
    id: string
  ) => Promise<PartialDisclosureAttributes[] | null | undefined>;
  getAllPartialDisclosureByVisitId: (
    id: string
  ) => Promise<PartialDisclosureAttributes[] | null>;
}
