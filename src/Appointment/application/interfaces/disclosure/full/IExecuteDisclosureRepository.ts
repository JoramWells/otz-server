import { ExecuteDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/ExecuteDisclosureEntity";

export interface IExecuteDisclosureRepository {
  create: (data: ExecuteDisclosureEntity) => Promise<ExecuteDisclosureEntity>;
  find: () => Promise<ExecuteDisclosureEntity[]>;
  findById: (id: string) => Promise<ExecuteDisclosureEntity | null>;
  findAllByVisitId: (id: string) => Promise<ExecuteDisclosureEntity[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
