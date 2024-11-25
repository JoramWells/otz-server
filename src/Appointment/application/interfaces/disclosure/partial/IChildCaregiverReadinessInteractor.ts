import { ChildCaregiverReadinessAttributes } from "otz-types";

export interface IChildCaregiverReadinessInteractor {
  createChildCaregiverReadiness: (
    data: ChildCaregiverReadinessAttributes
  ) => Promise<ChildCaregiverReadinessAttributes>;
  getAllChildCaregiverReadiness: (
    hospitalID: string
  ) => Promise<ChildCaregiverReadinessAttributes[] | null>;
  getChildCaregiverReadinessById: (
    id: string
  ) => Promise<ChildCaregiverReadinessAttributes | null>;
  getAllChildCaregiverReadinessByVisitId: (
    id: string
  ) => Promise<ChildCaregiverReadinessAttributes[] | null>;
}
