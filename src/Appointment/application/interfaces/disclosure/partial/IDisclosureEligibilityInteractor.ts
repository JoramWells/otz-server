import { ChildCaregiverReadinessAttributes, ChildDisclosureEligibilityAttributes } from "otz-types";

export interface IDisclosureEligibilityInteractor {
  createDisclosureEligibility: (
    data: ChildDisclosureEligibilityAttributes,
    readinessData: ChildCaregiverReadinessAttributes
  ) => Promise<ChildDisclosureEligibilityAttributes>;
  getAllDisclosureEligibility: () => Promise<
    ChildDisclosureEligibilityAttributes[]
  >;
  getDisclosureEligibilityById: (
    id: string
  ) => Promise<ChildDisclosureEligibilityAttributes | null>;
  getAllDisclosureEligibilityByVisitId: (
    id: string
  ) => Promise<ChildDisclosureEligibilityAttributes[] | null>;
}
