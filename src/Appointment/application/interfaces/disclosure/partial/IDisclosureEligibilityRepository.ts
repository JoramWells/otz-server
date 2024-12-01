import { ChildCaregiverReadinessAttributes, ChildDisclosureEligibilityAttributes } from "otz-types";

export interface IDisclosureEligibilityRepository {
  create: (
    data: ChildDisclosureEligibilityAttributes,
    readiness: ChildCaregiverReadinessAttributes
  ) => Promise<ChildDisclosureEligibilityAttributes>;
  find: (
    hospitalID: string
  ) => Promise<ChildDisclosureEligibilityAttributes[] | null>;
  findById: (
    id: string
  ) => Promise<ChildDisclosureEligibilityAttributes | null | undefined>;
  findByPatientId: (
    patientID: string
  ) => Promise<ChildDisclosureEligibilityAttributes | null | undefined>;
  findByVisitId: (
    patientVisitID: string
  ) => Promise<ChildDisclosureEligibilityAttributes | null | undefined>;
  findAllByVisitId: (
    id: string
  ) => Promise<ChildDisclosureEligibilityAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
