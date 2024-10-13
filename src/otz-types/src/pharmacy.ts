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
