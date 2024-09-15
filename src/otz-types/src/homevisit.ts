export enum FrequencyAttributes {
  Bimonthly = "Bimonthly",
  Daily = "Daily",
  Monthly = "Monthly",
  Once = "Once",
  Weekly = "Weekly",
}

export interface HomeVisitConfigAttributes {
  id?: string;
  patientVisitID?: string;
  homeVisitReasonID?: string;
  dateRequested?: string;
  frequency?: FrequencyAttributes;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export enum MedicineStatusAttributes {
  Adequate = "Adequate",
  Inadequate = "Inadequate",
}

export interface HomeVisitAttributes {
  id?: string;
  homeVisitConfigID?: string;
  artPrescription?: {
    currentRegimen: string
    currentRegimenBegan: Date | string
  };
  tbPrescription?: string;
  noOfPills?: number;
  medicineStatus?: MedicineStatusAttributes;
  actionTaken?: string;
  ol_drugs?: string;
  returnToClinic?: string;
  isPillsCounted?: boolean;
  isClinicVisits?: boolean;
  isDisclosure?: boolean;
  isGuardianSupport?: boolean;
  isSupportGroupAttendance?: boolean;
  isHouseholdTested?: boolean;
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface HomeVisitFrequencyAttributes {
  id?: string;
  homeVisitFrequencyDescription?: string;
}

export interface HomeVisitReasonAttributes {
  id?: string;
  homeVisitReasonDescription?: string;
}
