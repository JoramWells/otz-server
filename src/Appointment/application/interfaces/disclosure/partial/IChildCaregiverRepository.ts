import { ChildCaregiverReadinessAttributes } from "otz-types";

export interface IChildCaregiverRepository {
  create: (data: ChildCaregiverReadinessAttributes) => Promise<ChildCaregiverReadinessAttributes>;
  find: () => Promise<ChildCaregiverReadinessAttributes[]>;
  findById: (id: string) => Promise<ChildCaregiverReadinessAttributes | null>;
  findAllByVisitId: (id: string) => Promise<ChildCaregiverReadinessAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
