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
  getFullDisclosureByPatientId: (
    id: string
  ) => Promise<FullDisclosureAttributes | null | undefined>;
  getAllFullDisclosureByVisitId: (
    id: string
  ) => Promise<FullDisclosureAttributes[] | null>;
}
