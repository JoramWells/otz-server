import { FullDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/FullDisclosureEntity";

export interface IFullDisclosureInteractor {
  createFullDisclosure: (
    data: FullDisclosureEntity
  ) => Promise<FullDisclosureEntity>;
  getAllFullDisclosure: () => Promise<FullDisclosureEntity[]>;
  getFullDisclosureById: (
    id: string
  ) => Promise<FullDisclosureEntity | null>;
  getAllFullDisclosureByVisitId: (
    id: string
  ) => Promise<FullDisclosureEntity[] | null>;
}
