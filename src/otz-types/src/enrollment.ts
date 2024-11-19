export interface PMTCTProfileInterface {
  id?: string;
  patientID?: string;
  kmhflCode?: string;
  anc?: string;
  pncNo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PMTCTMaternalervicesInterface {
  id?: string;
  pmtctProfileID?: string;
  pointOfEntry?: string;
  dateArtInitiatedOrDeclined?: Date | string;
  initialRegimen?: string;
  currentRegimen?: string;
  dateInitialVLDoneWithCurrentPregnancy?: Date | string;
  firstVlResults?: number;
  dateSecondVL?: Date | string;
  secondVlResults?: number;
  dateHighVLRepeated?: Date | string;
  highVLResults?: number;
  enhancedAdherenceDone?: string;
  dateOfArtSwitch?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PMTCTDeliveryInterface {
  id?: string;
  pmtctProfileID?: string;
  pregnancyOutcome?: string;
  dateOfDelivery?: string | Date;
  placeOfDelivery?: string;
  modeOfDelivery?: string;
  isInfantAlive?: boolean;
  motherStartedOnFP?: boolean;
  indicatedTypeOfMethod?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PMTCTANCTrimesterVisitInterface {
  id?: string;
  pmtctProfileID?: string;
  trimesterLevel?: string;
  gestAge?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MedicalSurgicalHistoryInterface {
  id?: string;
  pmtctProfileID?: string;
  surgicalOperation?: string;
  isDiabetic?: boolean;
  isHypertensive?: boolean;
  isBloodTransfusion?: boolean;
  isTB?: boolean;
  allergy?: boolean;
  twins?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PAMAInterface {
  id?: string;
  childID?: string;
  childVLID?: string;
  childPrescriptionID?: string;
  // primaryCaregiverVLStatus: VLDataProps;
  // primaryCaregiverPrescriptionStatus: PrescriptionProps;
  primaryCaregiverID?: string;
  dateOfEnrollment: Date;
  isPaired: boolean;
  noOfCaregivers: number;
}
