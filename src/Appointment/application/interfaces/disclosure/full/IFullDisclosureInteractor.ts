import { FullDisclosureAttributes } from "otz-types";

export interface IFullDisclosureInteractor {
  createFullDisclosure: (
    data: FullDisclosureAttributes
  ) => Promise<FullDisclosureAttributes>;
  getAllFullDisclosure: (
    hospitalID: string
  ) => Promise<FullDisclosureAttributes[] | null>;
  getFullDisclosureById: (
    id: string
  ) => Promise<FullDisclosureAttributes | null>;
  getAllFullDisclosureByVisitId: (
    id: string
  ) => Promise<FullDisclosureAttributes[] | null>;
}
