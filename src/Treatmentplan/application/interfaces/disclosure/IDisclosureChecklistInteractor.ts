import { DisclosureChecklistAttributes } from "otz-types";

export interface IDisclosureChecklistInteractor {
  createDisclosureChecklist: (
    data: DisclosureChecklistAttributes
  ) => Promise<DisclosureChecklistAttributes>;
  getAllDisclosureChecklist: (
    hospitalID: string
  ) => Promise<DisclosureChecklistAttributes[] | null>;
  getDisclosureChecklistById: (
    id: string
  ) => Promise<DisclosureChecklistAttributes | null>;
  getDisclosureChecklistByVisitId: (
    id: string
  ) => Promise<DisclosureChecklistAttributes | null | undefined>;
  getAllDisclosureChecklistByVisitId: (
    id: string
  ) => Promise<DisclosureChecklistAttributes[] | null>;
}
