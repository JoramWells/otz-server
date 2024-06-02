import { ChildCaregiverReadinessEntity } from "../../../../domain/entities/treatmentplan/disclosure/partial/ChildCaregiverReadinessEntity";
import { DisclosureEligibilityEntity } from "../../../../domain/entities/treatmentplan/disclosure/partial/DisclosureEligibilityEntity";

export interface IDisclosureEligibilityInteractor {
  createDisclosureEligibility: (data: DisclosureEligibilityEntity, readinessData: ChildCaregiverReadinessEntity  ) => Promise<DisclosureEligibilityEntity>;
  getAllDisclosureEligibility: () => Promise<DisclosureEligibilityEntity[]>;
  getDisclosureEligibilityById: (
    id: string
  ) => Promise<DisclosureEligibilityEntity | null>;
  getAllDisclosureEligibilityByVisitId: (
    id: string
  ) => Promise<DisclosureEligibilityEntity[] | null>;
}
