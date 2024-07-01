import { FullDisclosureAttributes } from "otz-types";

export interface IFullDisclosureInteractor {
  createFullDisclosure: (
    data: FullDisclosureAttributes
  ) => Promise<FullDisclosureAttributes>;
  getAllFullDisclosure: () => Promise<FullDisclosureAttributes[]>;
  getFullDisclosureById: (
    id: string
  ) => Promise<FullDisclosureAttributes | null>;
  getAllFullDisclosureByVisitId: (
    id: string
  ) => Promise<FullDisclosureAttributes[] | null>;
}
