import { ChildCaregiverReadinessAttributes } from "../../../../models/treatmentplan/disclosure/childCaregiverReadiness.model";
import { PartialDisclosureAttributes } from "../../../../models/treatmentplan/disclosure/partialDisclosure.model";

export class PartialDisclosureEntity implements PartialDisclosureAttributes {
  constructor() {}
  childDisclosureEligibilityID?: string;
  childCaregiverReadinessID?: string;

}
