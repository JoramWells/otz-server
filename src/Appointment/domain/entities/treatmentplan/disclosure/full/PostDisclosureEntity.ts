import { PostDisclosureAttributes } from "../../../../models/treatmentplan/disclosure/postDisclosureAssessment.model";

export class PostDisclosureEntity implements PostDisclosureAttributes {
  constructor() {}
  id?: string | undefined;
  patientID!: string;
  patientVisitID!: string;
  isAssessedFunctionalSchoolEngagement!: boolean;
  isAssessedPeerRelationshipAssessed!: boolean;
  isAssessedChildEngagement!: boolean;
  isChildQuestionsAllowed!: boolean;
  isAddressedNegativeSelfImage!: boolean;
  isAssessedMoodiness!: boolean;
  isReferredForPsychiatric!: boolean;
  isGivenAppropriateInfo!: boolean;
  taskFourComments!: string;
  finalComments!: string;
  
}
