import { ChildDisclosureEligibilityAttributes } from "../../../../models/treatmentplan/disclosure/childDisclosureEligibility.model";

export class DisclosureEligibilityEntity implements ChildDisclosureEligibilityAttributes {
  constructor() {}
  id?: string | undefined;
  patientID!: string;
  patientVisitID!: string;
  isCorrectAge!: boolean;
  isKnowledgeable!: boolean;
  isWillingToDisclose!: boolean;
  taskOneComments!: string;

}
