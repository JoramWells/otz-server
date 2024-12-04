export interface PrescriptionInterface {
  id?: string;
  patientID?: string;
  patientVisitID?: string;
  artPrescriptionID?: string;
  message?: string;
  noOfPills: number;
  frequency: number;
  refillDate: Date;
  nextRefillDate: Date;
  isCompleted?: boolean;

  //
  expectedNoOfPills?: number;
  computedNoOfPills?: number;
  updatedAtExpectedNoOfPills?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MeasuringUnitInterface {
  id: string;
  description: string;
}

export interface ARTSwitchReasonInterface {
  id: string;
  reason: string;
}


export interface ARTPrescriptionInterface {
  id: string;
  patientID: string;
  patientVisitID?: string;
  regimen: string;
  changeReason: string;
  stopReason: string;
  startDate: Date;
  changeDate: Date;
  stopDate: Date;
  isStandard: boolean;
  isSwitched: boolean;
  isStopped: boolean;
  line: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum AgeLine {
  Pediatric = "pediatric",
  Adult = "adults",
}

// artCategories;

export enum ArtPhase {
  First = "first line",
  Second = "second line",
  Third = "third line",
}
//

export interface ArtCategoryInterface {
  id: string;
  artCategoryDescription: string;
  ageLine: AgeLine;
  artPhase: ArtPhase;
}

export interface ARTInterface {
  id: string;
  artName: string;
  artCategoryID: string;
  measuringUnitID: string;
  quantity: number;
  expiryDate: Date;
  createdAt?: Date
  updatedAt?: Date
}

export interface AdherenceAttributes {
  id?: string;
  timeAndWorkID?: string;
  prescriptionID?: string;
  currentDate?: Date;
  morningStatus?: boolean;
  eveningStatus?: boolean;
  totalQuantityPrescribed?: number;
  totalQuantityDispensed?: number;
  createdAt?: Date;
  updatedAt?: Date;
}


  export interface AdherenceByPatientAttributes {
    [patientID: string]: AdherenceAttributes;
  }


export interface TimeAndWorkAttributes {
  id: string;
  patientID: string;
  patientVisitID: string;
  wakeUpTime: string;
  departureHomeTime: string;
  arrivalWorkTime: string;
  departureWorkTime: string;
  arrivalHomeTime: string;
  morningPlace: string;
  morningMedicineTime: string;
  eveningPlace: string;
  eveningMedicineTime: string;
  medicineStorage: string;
  toolsAndCues: string;
  goal: string;
  morningWeekendPlace: string;
  eveningWeekendPlace: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ViralLoadInterface {
  id: string;
  patientID: string;
  userID: string;
  patientVisitID?: string;
  vlResults: number;
  isVLValid?: boolean;
  vlJustification?: string;
  dateOfVL?: Date | string;
  dateOfNextVL?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OTZEnrollmentsInterface {
  id: string;
  patientID: string;
  enrolledBy: string;
  dateOfEnrollmentToOTZ?: Date | string;
  currentArtPrescriptionID: string;
  currentViralLoadID: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VitalSignsInterface {
  id?: string;
  patientID?: string;
  bmi?: string;
  temperature?: string;
  weight?: string;
  height?: string;
  systolic?: string;
  diastolic?: string;
  muac?: string;
  nutritionalStatus: string;
  oxygenSAturation: string;
  respiratoryRate?: string;
  pulseRate?: string;
  lmp?: string;
  gravida?: string;
  parity?: string;
  edd?: string;
  patientVisitID?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CD4Interface {
  id?: string;
  patientID?: string;
  patientVisitID?: string;
  hospitalID?: string;
  baselineCD4?: string;
  CD4Count?: string;
  currentCD4Date?: string | Date;
  lastCD4Date?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LabTestCategoryInterface {
  id?: string;
  specimenID?: string;
  categoryName?: string;
  normalValues?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LabSpecimenInterface {
  id?: string;
  specimenDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 

export interface InternalLabRequestInterface {
  id?: string;
  patientID?: string;
  patientVisitID?: string;
  specimenType?: string;
  testName?: string;
  urgency?: string;
  normalValues?: string;
  reason?: string;
  results?: string;
  resultDate?: Date;
  dateRequested?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}     

export interface VlJustificationsInterface {
  id?: string;
  reason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}