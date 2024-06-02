import { ChildCaregiverReadinessEntity } from "../../../../domain/entities/treatmentplan/disclosure/partial/ChildCaregiverReadinessEntity";

export interface IChildCaregiverReadinessInteractor {
  createChildCaregiverReadiness: (
    data: ChildCaregiverReadinessEntity
  ) => Promise<ChildCaregiverReadinessEntity>;
  getAllChildCaregiverReadiness: () => Promise<ChildCaregiverReadinessEntity[]>;
  getChildCaregiverReadinessById: (
    id: string
  ) => Promise<ChildCaregiverReadinessEntity | null>;
  getAllChildCaregiverReadinessByVisitId: (
    id: string
  ) => Promise<ChildCaregiverReadinessEntity[] | null>;
}
