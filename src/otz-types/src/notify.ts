export interface UptakeAttributes {
  id?: string;
  timeAndWorkID: string;
  currentDate: string;
  morningStatus: boolean;
  eveningStatus: boolean;
}

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

export interface UserNotificationAttributes {
  id: string;
  patientID: string;
  notificationID: string;
  notifications: string;
}

export interface PatientNotificationAttributes {
  id: string;
  patientID: string;
  userID: string;
  medicineTime: string;
  message: string;
}

export interface NotificationTypeAttributes {
  id: string;
  notificationTypeName: string;
}

export interface NotificationSubCategoryAttributes {
  id: string;
  notificationCategoryID: string;
  notificationSubCategoryName: string;
}

export interface NotificationCategoryAttributes {
  id: string;
  notificationDescription: string;
}

export interface NotificationAttributes {
  id: string;
  notificationSubCategoryID: string;
  notificationDescription: string;
}

export interface MessageTextReplyAttributes {
  id: string;
  messageText: string;
}

export interface ChatAttributes {
  id?: string;
  // messages?: string;
  members?: string[];
}

export interface MessagesAttributes {
  id?: string;
  chatID?: string;
  text?: string;
  senderID?: string;
}