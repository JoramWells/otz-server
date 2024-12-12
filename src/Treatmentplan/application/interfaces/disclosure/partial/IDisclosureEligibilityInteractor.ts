import { ChildCaregiverReadinessAttributes, ChildDisclosureEligibilityAttributes } from "otz-types";

export interface IDisclosureEligibilityInteractor {
  createDisclosureEligibility: (
    data: ChildDisclosureEligibilityAttributes,
  ) => Promise<ChildDisclosureEligibilityAttributes | undefined | null>;
  getAllDisclosureEligibility: (
    hospitalID: string
  ) => Promise<ChildDisclosureEligibilityAttributes[] | null>;
  getDisclosureEligibilityById: (
    id: string
  ) => Promise<ChildDisclosureEligibilityAttributes | null | undefined>;
  getDisclosureEligibilityByPatientId: (
    patientID: string
  ) => Promise<ChildDisclosureEligibilityAttributes | null | undefined>;
  getDisclosureEligibilityByVisitId: (
    patientVisitID: string
  ) => Promise<ChildDisclosureEligibilityAttributes | null | undefined>;
  getAllDisclosureEligibilityByVisitId: (
    id: string
  ) => Promise<ChildDisclosureEligibilityAttributes[] | null>;
}
