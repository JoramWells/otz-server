import { DisclosureChecklistAttributes } from "../../models/treatmentplan/disclosureChecklist.model";

export class DisclosureChecklistEntity implements DisclosureChecklistAttributes {
  constructor() {}
  id?: string | undefined;
  patientID!: string;
  patientVisitID!: string;
  disclosureDate!: Date;
  isCorrectAge!: boolean;
  isWillingToDisclose!: boolean;
  isChildActivityAssessed!: boolean;
  isKnowledgeable!: boolean;
  taskOneComments!: string;
  isFreeFromSevereIllness!: boolean;
  isFamilySupport!: boolean;
  isSupportedCaregiverChildToDisclose!: boolean;
  isEnvironmentInterest!: boolean;
  isAware!: boolean;
  isSchoolFree!: boolean;
  isDisclosureReady!: boolean;
  isChildCommunicated!: boolean;
  isSecuredPatientInfo!: boolean;
  taskTwoComments!: string;
  isReassuredCaregiver!: boolean;
  isAssessedChildCaregiverComfort!: boolean;
  isObservedReactions!: boolean;
  isInvitedChildQuestions!: boolean;
  isReviewedBenefitsOfDisclosure!: boolean;
  isExplainedCareOptions!: boolean;
  isConcludedSessionReassured!: boolean;
  taskThreeComments!: string;
  isPeerRelationshipAssessed!: boolean;
  isChildQuestionsAllowed!: boolean;
  isAddressedNegativeImage!: boolean;
  isAssessedMoodiness!: boolean;
  isReferredForPhysic!: boolean;
  isGivenInfo!: boolean;
  taskFourComments!: string;
  finalComments!: string;
}
