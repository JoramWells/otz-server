import { ChildCaregiverReadinessAttributes } from "otz-types";

export interface IChildCaregiverRepository {
  create: (
    data: ChildCaregiverReadinessAttributes
  ) => Promise<ChildCaregiverReadinessAttributes>;
  find: (
    hospitalID: string
  ) => Promise<ChildCaregiverReadinessAttributes[] | null>;
  findById: (
    id: string
  ) => Promise<ChildCaregiverReadinessAttributes | null | undefined>;
  findByPatientId: (
    patientID: string
  ) => Promise<ChildCaregiverReadinessAttributes | null | undefined>;
  findByVisitId: (
    visitID: string
  ) => Promise<ChildCaregiverReadinessAttributes | null | undefined>;
  findAllByVisitId: (
    id: string
  ) => Promise<ChildCaregiverReadinessAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
