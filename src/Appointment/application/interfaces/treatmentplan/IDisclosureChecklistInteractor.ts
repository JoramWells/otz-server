import { DisclosureChecklistEntity } from "../../../domain/entities/treatmentplan/DisclosureChecklistEntity";

export interface IDisclosureChecklistInteractor {
  createDisclosureChecklist: (data: DisclosureChecklistEntity) => Promise<DisclosureChecklistEntity>;
  getAllDisclosureChecklist: () => Promise<DisclosureChecklistEntity[]>;
  getDisclosureChecklistById: (id: string) => Promise<DisclosureChecklistEntity | null>;
}
