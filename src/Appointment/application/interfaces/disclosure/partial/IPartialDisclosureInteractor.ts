import { PartialDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/partial/PartialDisclosureEntity";

export interface IPartialDisclosureInteractor {
  createPartialDisclosure: (
    data: PartialDisclosureEntity
  ) => Promise<PartialDisclosureEntity>;
  getAllPartialDisclosure: () => Promise<PartialDisclosureEntity[]>;
  getPartialDisclosureById: (
    id: string
  ) => Promise<PartialDisclosureEntity | null>;
  getAllPartialDisclosureByVisitId: (
    id: string
  ) => Promise<PartialDisclosureEntity[] | null>;
}
