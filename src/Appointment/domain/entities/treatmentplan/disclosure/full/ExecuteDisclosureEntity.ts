import { ExecuteDisclosureAttributes } from "../../../../models/treatmentplan/disclosure/full/executeDisclosure.model";

export class ExecuteDisclosureEntity implements ExecuteDisclosureAttributes {
  constructor() {}
  id?: string | undefined;
  patientID!: string;
  patientVisitID!: string;
  isReassuredCaregiver!: boolean;
  isAssessedChildCaregiverComfort!: boolean;
  isAssessedEnvironmentAndTiming!: boolean;
  isAssessedDepthOfChildKnowledge!: boolean;
  isSupportedCaregiverChildToDisclose!: boolean;
  isObservedImmediateReactions!: boolean;
  isInvitedChildQuestions!: boolean;
  isReviewedBenefitsOfDisclosure!: boolean;
  isExplainedCareOptions!: boolean;
  isConcludedSessionReassured!: boolean;
  taskThreeComments!: string;

}
