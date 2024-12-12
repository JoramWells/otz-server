import { ChildCaregiverReadinessAttributes } from "otz-types";

export interface IChildCaregiverReadinessInteractor {
  createChildCaregiverReadiness: (
    data: ChildCaregiverReadinessAttributes
  ) => Promise<ChildCaregiverReadinessAttributes>;
  getAllChildCaregiverReadiness: (
    hospitalID: string
  ) => Promise<ChildCaregiverReadinessAttributes[] | null | undefined>;
  getChildCaregiverReadinessById: (
    id: string
  ) => Promise<ChildCaregiverReadinessAttributes | null | undefined>;
  getChildCaregiverReadinessByVisitId: (
    id: string
  ) => Promise<ChildCaregiverReadinessAttributes | null | undefined>;
  getChildCaregiverReadinessByPatientId: (
    patientID: string
  ) => Promise<ChildCaregiverReadinessAttributes | null | undefined>;
  getAllChildCaregiverReadinessByVisitId: (
    id: string
  ) => Promise<ChildCaregiverReadinessAttributes[] | null>;
}
