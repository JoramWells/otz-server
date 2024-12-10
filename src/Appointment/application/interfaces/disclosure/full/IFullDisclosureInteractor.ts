import { FullDisclosureAttributes } from "otz-types";
import { FullDisclosureResponseInterface } from "../../../../entities/FullDisclosureResponseInterface";

export interface IFullDisclosureInteractor {
  createFullDisclosure: (
    data: FullDisclosureAttributes
  ) => Promise<FullDisclosureAttributes>;
  getAllFullDisclosure: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ) => Promise<FullDisclosureResponseInterface | null | undefined>;
  getFullDisclosureById: (
    id: string
  ) => Promise<FullDisclosureAttributes | null>;
  getFullDisclosureByPatientId: (
    id: string
  ) => Promise<FullDisclosureAttributes | null | undefined>;
  getAllFullDisclosureByVisitId: (
    id: string
  ) => Promise<FullDisclosureAttributes[] | null>;
}
