import { ChildCaregiverReadinessEntity } from "../../../../domain/entities/treatmentplan/disclosure/partial/ChildCaregiverReadinessEntity";

export interface IChildCaregiverRepository {
  create: (data: ChildCaregiverReadinessEntity) => Promise<ChildCaregiverReadinessEntity>;
  find: () => Promise<ChildCaregiverReadinessEntity[]>;
  findById: (id: string) => Promise<ChildCaregiverReadinessEntity | null>;
  findAllByVisitId: (id: string) => Promise<ChildCaregiverReadinessEntity[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
