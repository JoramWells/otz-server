import { ChildCaregiverReadinessAttributes, ChildDisclosureEligibilityAttributes } from "otz-types";

export interface IDisclosureEligibilityInteractor {
  createDisclosureEligibility: (
    data: ChildDisclosureEligibilityAttributes,
    readinessData: ChildCaregiverReadinessAttributes
  ) => Promise<ChildDisclosureEligibilityAttributes>;
  getAllDisclosureEligibility: (
    hospitalID: string
  ) => Promise<ChildDisclosureEligibilityAttributes[] | null>;
  getDisclosureEligibilityById: (
    id: string
  ) => Promise<ChildDisclosureEligibilityAttributes | null>;
  getDisclosureEligibilityByPatientId: (
    patientID: string
  ) => Promise<ChildDisclosureEligibilityAttributes | null>;
  getAllDisclosureEligibilityByVisitId: (
    id: string
  ) => Promise<ChildDisclosureEligibilityAttributes[] | null>;
}
