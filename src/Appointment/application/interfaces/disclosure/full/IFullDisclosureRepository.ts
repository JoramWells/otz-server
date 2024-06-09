import { FullDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/FullDisclosureEntity";

export interface IFullDisclosureRepository {
  create: (data: FullDisclosureEntity) => Promise<FullDisclosureEntity>;
  find: () => Promise<FullDisclosureEntity[]>;
  findById: (id: string) => Promise<FullDisclosureEntity | null>;
  findAllByVisitId: (id: string) => Promise<FullDisclosureEntity[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
