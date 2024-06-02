import { PartialDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/partial/PartialDisclosureEntity";

export interface IPartialDisclosureRepository {
  create: (data: PartialDisclosureEntity) => Promise<PartialDisclosureEntity>;
  find: () => Promise<PartialDisclosureEntity[]>;
  findById: (id: string) => Promise<PartialDisclosureEntity | null>;
  findAllByVisitId: (id: string) => Promise<PartialDisclosureEntity[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
