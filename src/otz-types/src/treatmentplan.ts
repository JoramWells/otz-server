import { PatientAttributes, PatientVisitsInterface } from "./patient";
import { PrescriptionInterface, TimeAndWorkAttributes } from "./pharmacy";

export interface MMASAttributes {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  patientVisitID?: string;
  PatientVisit?: PatientVisitsInterface;
  isForget?: boolean;
  isCareless?: boolean;
  isQuitFeelWorse?: boolean;
  isQuitFeelBetter?: boolean;
  isTookMedYesterday?: boolean;
  isQuitOutControl?: boolean;
  isUnderPressure?: boolean;
  difficultyRemembering?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface DisclosureChecklistAttributes {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes
  patientVisitID?: string;
  PatientVisit?: PatientVisitsInterface;
  disclosureDate?: Date;
  isCorrectAge?: boolean;
  isWillingToDisclose?: boolean;
  isChildActivityAssessed?: boolean;
  isKnowledgeable?: boolean;
  taskOneComments?: string;
  isFreeFromSevereIllness?: boolean;
  isFamilySupport?: boolean;
  isSupportedCaregiverChildToDisclose?: boolean;
  isEnvironmentInterest?: boolean;
  isAware?: boolean;
  isSchoolFree?: boolean;
  isDisclosureReady?: boolean;
  isChildCommunicated?: boolean;
  isSecuredPatientInfo?: boolean;
  taskTwoComments?: string;
  isReassuredCaregiver?: boolean;
  isAssessedChildCaregiverComfort?: boolean;
  isObservedReactions?: boolean;
  isInvitedChildQuestions?: boolean;
  isReviewedBenefitsOfDisclosure?: boolean;
  isExplainedCareOptions?: boolean;
  isConcludedSessionReassured?: boolean;
  taskThreeComments?: string;
  isPeerRelationshipAssessed?: boolean;
  isChildQuestionsAllowed?: boolean;
  isAddressedNegativeImage?: boolean;
  isAssessedMoodiness?: boolean;
  isReferredForPhysic?: boolean;
  isGivenInfo?: boolean;
  taskFourComments?: string;
  finalComments?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface FollowUpChecklistAttributes {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  patientVisitID?: string;
  PatientVisit?: PatientVisitsInterface;
  followUpDate?: Date;
  bmi?: number;
  tannerStaging?: string;
  disclosure?: string;
  adherenceCounselling?: string;
  isPAMA?: boolean;
  isOVC?: boolean;
  isActiveSupportGroup?: boolean;
  isVLValid?: boolean;
  isOptimizationDone?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface UptakeAttributes {
  id?: string;
  timeAndWorkID: string;
  TimeAndWork?: TimeAndWorkAttributes;
  prescriptionID?: string;
  Prescription?: PrescriptionInterface;
  currentDate: Date | string;
  morningStatus: boolean;
  eveningStatus: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface MMASFourAttributes {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  patientVisitID?: string;
  PatientVisit?: PatientVisitsInterface;
  isForget?: boolean;
  isCareless?: boolean;
  isQuitFeelWorse?: boolean;
  isQuitFeelBetter?: boolean;
  totalScores?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface MMASEightAttributes {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  patientVisitID?: string;
  PatientVisit?: PatientVisitsInterface;
  mmasFourID?: string;
  MMASFour?: MMASFourAttributes;
  isTookMedYesterday?: boolean;
  isQuitOutControl?: boolean;
  isUnderPressure?: boolean;
  difficultyRemembering?: string;
  totalScores?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ExecuteDisclosureAttributes {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  patientVisitID?: string;
  PatientVisit?: PatientVisitsInterface;
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
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface FullDisclosureAttributes {
  id?: string;
  score?: number;
  patientID?: string;
  Patient?: PatientAttributes;
  executeDisclosureID: string;
  ExecuteDisclosure?: ExecuteDisclosureAttributes;
  postDisclosureID: string;
  PostDisclosure?: PostDisclosureAttributes;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface PostDisclosureAttributes {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  patientVisitID?: string;
  PatientVisit?: PatientVisitsInterface;
  isAssessedFunctionalSchoolEngagement?: boolean;
  isPeerRelationshipAssessed?: boolean;
  isAssessedChildEngagement?: boolean;
  isChildQuestionsAllowed?: boolean;
  isAddressedNegativeSelfImage?: boolean;
  isAssessedMoodiness?: boolean;
  isReferredForPsychiatric?: boolean;
  isGivenAppropriateInfo?: boolean;
  taskFourComments?: string;
  finalComments?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ChildCaregiverReadinessAttributes {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  patientVisitID?: string;
  PatientVisit?: PatientVisitsInterface;
  isFreeChildCaregiverFromSevereIllness?: boolean;
  isConsistentSocialSupport?: boolean;
  isInterestInEnvironmentAndPlaying?: boolean;
  isChildKnowsMedicineAndIllness?: boolean;
  isChildSchoolEngagement?: boolean;
  isAssessedCaregiverReadinessToDisclose?: boolean;
  isCaregiverCommunicatedToChild?: boolean;
  isSecuredPatientInfo?: boolean;
  taskTwoComments: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ChildDisclosureEligibilityAttributes {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  patientVisitID?: string;
  PatientVisit?: PatientVisitsInterface;
  isCorrectAge?: boolean;
  isKnowledgeable?: boolean;
  isWillingToDisclose?: boolean;
  taskOneComments?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface PartialDisclosureAttributes {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  childDisclosureEligibilityID?: string;
  ChildDisclosureEligibility?: ChildDisclosureEligibilityAttributes;
  childCaregiverReadinessID?: string;
  ChildCaregiverReadiness?: ChildCaregiverReadinessAttributes;
  score?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export enum AdherenceImpression {
  Excellent = "excellent",
  Unsure = "unsure",
  Inadequate = "inadequate",
}

export interface EnhancedAdherenceAttributes {
  id?: string;
  prescriptionID?: string;
  Prescription?: PrescriptionInterface;
  treatmentMotivation?: string;
  date?: Date | string;
  adherencePercentage?: number;
  mmas8Score?: number;
  barriersToAdherence?: string;
  impression?: AdherenceImpression;
  plan?: string;
  nextAppointmentDate?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface DisclosureTrackerInterface {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  partialDisclosureID?: string;
  fullDisclosureID?: boolean;
  PartialDisclosureAttributes?: PartialDisclosureAttributes;
  FullDisclosureAttributes?: FullDisclosureAttributes;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
