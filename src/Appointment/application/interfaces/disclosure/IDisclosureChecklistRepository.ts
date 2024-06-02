import { DisclosureChecklistEntity } from "../../../domain/entities/treatmentplan/DisclosureChecklistEntity";

export interface IDisclosureChecklistRepository {
  create: (data: DisclosureChecklistEntity) => Promise<DisclosureChecklistEntity>;
  find: () => Promise<DisclosureChecklistEntity[]>;
  findById: (id: string) => Promise<DisclosureChecklistEntity | null>;
  findAllByVisitId: (id: string) => Promise<DisclosureChecklistEntity[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
