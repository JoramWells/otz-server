import { ExecuteDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/ExecuteDisclosureEntity";

export interface IExecuteDisclosureInteractor {
  createExecuteDisclosure: (
    data: ExecuteDisclosureEntity
  ) => Promise<ExecuteDisclosureEntity>;
  getAllExecuteDisclosure: () => Promise<ExecuteDisclosureEntity[]>;
  getExecuteDisclosureById: (
    id: string
  ) => Promise<ExecuteDisclosureEntity | null>;
  getAllExecuteDisclosureByVisitId: (
    id: string
  ) => Promise<ExecuteDisclosureEntity[] | null>;
}
