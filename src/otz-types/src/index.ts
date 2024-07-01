export interface UptakeAttributes {
  id?: string;
  timeAndWorkID: string;
  currentDate: string;
  morningStatus: boolean;
  eveningStatus: boolean;
}

export interface UserInterface {
  id?: string
  firstName: string
  middleName: string
  lastName?: string
  email: string
  sex: string
  phoneNo?: string
  countyID: string
  password?: string
  dob: string
  idNo: string
}

export interface PatientVisitsInterface {
  id?: string;
  patientID?: string;
}

export interface PatientAttributes {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  sex?: string;
  dob?: string;
  phoneNo?: string;
  idNo?: string;
  occupationID?: string;
  cccNo?: string;
  ageAtReporting?: string;
  dateConfirmedPositive?: string;
  initialRegimen?: string;
  populationType?: string;
  schoolID?: string;
  hospitalID?: string;
  entryPoint?: string;
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


