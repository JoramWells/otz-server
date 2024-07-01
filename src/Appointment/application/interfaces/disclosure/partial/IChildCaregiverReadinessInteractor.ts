import { ChildCaregiverReadinessAttributes } from "otz-types";

export interface IChildCaregiverReadinessInteractor {
  createChildCaregiverReadiness: (
    data: ChildCaregiverReadinessAttributes
  ) => Promise<ChildCaregiverReadinessAttributes>;
  getAllChildCaregiverReadiness: () => Promise<ChildCaregiverReadinessAttributes[]>;
  getChildCaregiverReadinessById: (
    id: string
  ) => Promise<ChildCaregiverReadinessAttributes | null>;
  getAllChildCaregiverReadinessByVisitId: (
    id: string
  ) => Promise<ChildCaregiverReadinessAttributes[] | null>;
}
