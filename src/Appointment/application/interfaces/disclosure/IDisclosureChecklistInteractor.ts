import { DisclosureChecklistAttributes } from "otz-types";

export interface IDisclosureChecklistInteractor {
  createDisclosureChecklist: (data: DisclosureChecklistAttributes) => Promise<DisclosureChecklistAttributes>;
  getAllDisclosureChecklist: () => Promise<DisclosureChecklistAttributes[]>;
  getDisclosureChecklistById: (id: string) => Promise<DisclosureChecklistAttributes | null>;
  getAllDisclosureChecklistByVisitId: (id: string) => Promise<DisclosureChecklistAttributes[] | null>;
}
