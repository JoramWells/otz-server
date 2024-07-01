import { ChildCaregiverReadinessAttributes, ChildDisclosureEligibilityAttributes } from "otz-types";

export interface IDisclosureEligibilityRepository {
  create: (data: ChildDisclosureEligibilityAttributes, readiness: ChildCaregiverReadinessAttributes) => Promise<ChildDisclosureEligibilityAttributes>;
  find: () => Promise<ChildDisclosureEligibilityAttributes[]>;
  findById: (id: string) => Promise<ChildDisclosureEligibilityAttributes | null>;
  findAllByVisitId: (id: string) => Promise<ChildDisclosureEligibilityAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
