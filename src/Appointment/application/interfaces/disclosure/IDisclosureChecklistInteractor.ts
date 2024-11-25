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
  getAllDisclosureChecklistByVisitId: (
    id: string
  ) => Promise<DisclosureChecklistAttributes[] | null>;
}
