import { ChildCaregiverReadinessEntity } from "../../../../domain/entities/treatmentplan/disclosure/partial/ChildCaregiverReadinessEntity";
import { DisclosureEligibilityEntity } from "../../../../domain/entities/treatmentplan/disclosure/partial/DisclosureEligibilityEntity";

export interface IDisclosureEligibilityRepository {
  create: (data: DisclosureEligibilityEntity, readiness: ChildCaregiverReadinessEntity) => Promise<DisclosureEligibilityEntity>;
  find: () => Promise<DisclosureEligibilityEntity[]>;
  findById: (id: string) => Promise<DisclosureEligibilityEntity | null>;
  findAllByVisitId: (id: string) => Promise<DisclosureEligibilityEntity[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
