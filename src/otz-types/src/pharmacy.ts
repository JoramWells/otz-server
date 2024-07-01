export interface PrescriptionInterface {
  id?: string;
  patientID: string;
  patientVisitID: string;
  artPrescriptionID: string;
  drugID: string;
  noOfPills: number;
  frequency: number;
  refillDate: Date;
  nextRefillDate: Date;

  //
  expectedNoOfPills: number;
  computedNoOfPills: number;
  updatedAtExpectedNoOfPills: Date;
  createdAt: Date;
  updatedAt: Date;
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
  isStandard: string;
  line: string;
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
}


