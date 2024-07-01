export interface TimeAndWorkAttributes {
  id: string;
  patientID: string;
  patientVisitID: string;
  wakeUpTime: Date;
  departureHomeTime: Date;
  arrivalWorkTime: Date;
  departureWorkTime: Date;
  arrivalHomeTime: Date;
  morningPlace: string;
  morningMedicineTime: Date;
  eveningPlace: string;
  eveningMedicineTime: Date;
  medicineStorage: string;
  toolsAndCues: string;
  goal: string;
  morningWeekendPlace: string;
  eveningWeekendPlace: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MMASAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  isForget: boolean;
  isCareless: boolean;
  isQuitFeelWorse: boolean;
  isQuitFeelBetter: boolean;
  isTookMedYesterday: boolean;
  isQuitOutControl: boolean;
  isUnderPressure: boolean;
  difficultyRemembering: string;
}

export interface DisclosureChecklistAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  disclosureDate: Date;
  isCorrectAge: boolean;
  isWillingToDisclose: boolean;
  isChildActivityAssessed: boolean;
  isKnowledgeable: boolean;
  taskOneComments: string;
  isFreeFromSevereIllness: boolean;
  isFamilySupport: boolean;
  isSupportedCaregiverChildToDisclose: boolean;
  isEnvironmentInterest: boolean;
  isAware: boolean;
  isSchoolFree: boolean;
  isDisclosureReady: boolean;
  isChildCommunicated: boolean;
  isSecuredPatientInfo: boolean;
  taskTwoComments: string;
  isReassuredCaregiver: boolean;
  isAssessedChildCaregiverComfort: boolean;
  isObservedReactions: boolean;
  isInvitedChildQuestions: boolean;
  isReviewedBenefitsOfDisclosure: boolean;
  isExplainedCareOptions: boolean;
  isConcludedSessionReassured: boolean;
  taskThreeComments: string;
  isPeerRelationshipAssessed: boolean;
  isChildQuestionsAllowed: boolean;
  isAddressedNegativeImage: boolean;
  isAssessedMoodiness: boolean;
  isReferredForPhysic: boolean;
  isGivenInfo: boolean;
  taskFourComments: string;
  finalComments: string;
}

export interface FollowUpChecklistAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  followUpDate: Date;
  bmi: number;
  tannerStaging: string;
  disclosure: string;
  adherenceCounselling: string;
  isPAMA: boolean;
  isOVC: boolean;
  isActiveSupportGroup: boolean;
  isVLValid: boolean;
  isOptimizationDone: boolean;
}

export interface UptakeAttributes {
  id?: string;
  timeAndWorkID: string;
  prescriptionID?: string;
  currentDate: Date | string;
  morningStatus: boolean;
  eveningStatus: boolean;
}

export interface MMASFourAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  isForget: boolean;
  isCareless: boolean;
  isQuitFeelWorse: boolean;
  isQuitFeelBetter: boolean;
  totalScores: number;
}

export interface MMASEightAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  mmasFourID?: string;
  isTookMedYesterday: boolean;
  isQuitOutControl: boolean;
  isUnderPressure: boolean;
  difficultyRemembering: string;
  totalScores: number;
}

export interface ExecuteDisclosureAttributes {
  id?: string;
  patientID?: string;
  patientVisitID?: string;

  isReassuredCaregiver: boolean;
  isAssessedChildCaregiverComfort: boolean;
  isAssessedEnvironmentAndTiming: boolean;
  isAssessedDepthOfChildKnowledge: boolean;
  isSupportedCaregiverChildToDisclose?: boolean;
  isObservedImmediateReactions: boolean;
  isInvitedChildQuestions: boolean;
  isReviewedBenefitsOfDisclosure?: boolean;
  isExplainedCareOptions: boolean;
  isConcludedSessionReassured: boolean;
  taskThreeComments?: string;
}

export interface FullDisclosureAttributes {
  id?: string;

  executeDisclosureID: string;
  postDisclosureID: string;
}

export interface PostDisclosureAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;

  isAssessedFunctionalSchoolEngagement: boolean;
  isAssessedPeerRelationshipAssessed: boolean;
  isAssessedChildEngagement: boolean;
  isChildQuestionsAllowed: boolean;
  isAddressedNegativeSelfImage: boolean;
  isAssessedMoodiness: boolean;
  isReferredForPsychiatric: boolean;
  isGivenAppropriateInfo: boolean;
  taskFourComments: string;
  finalComments: string;
}

export interface ChildCaregiverReadinessAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;

  isFreeChildCaregiverFromSevereIllness: boolean;
  isConsistentSocialSupport: boolean;
  isInterestInEnvironmentAndPlaying: boolean;
  isChildKnowsMedicineAndIllness: boolean;
  isChildSchoolEngagement: boolean;
  isAssessedCaregiverReadinessToDisclose: boolean;
  isCaregiverCommunicatedToChild: boolean;
  isSecuredPatientInfo: boolean;
  taskTwoComments: string;
}

export interface ChildDisclosureEligibilityAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  isCorrectAge: boolean;
  isKnowledgeable: boolean;
  isWillingToDisclose: boolean;
  taskOneComments: string;
}

export interface PartialDisclosureAttributes {
  id?: string;

  childDisclosureEligibilityID?: string;
  childCaregiverReadinessID?: string;
}
