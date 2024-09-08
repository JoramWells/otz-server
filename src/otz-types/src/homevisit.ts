export enum FrequencyAttributes {
  Bimonthly = "Bimonthly",
  Daily = "Daily",
  Monthly = "Monthly",
  Once = "Once",
  Weekly = "Weekly",
}

export interface HomeVisitConfigAttributes {
  id?: string;
  patientID?: string;
  homeVisitReasonID?: string;
  userID?: string;
  dateRequested?: string;
  frequency?: FrequencyAttributes;
}

export enum MedicineStatusAttributes {
  Adequate = "Adequate",
  Inadequate = "Inadequate",
}

export interface HomeVisitAttributes {
  id?: string;
  homeVisitConfigID?: string;
  artPrescription?: string;
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
}

export interface HomeVisitFrequencyAttributes {
  id?: string;
  homeVisitFrequencyDescription?: string;
}

export interface HomeVisitReasonAttributes {
  id?: string;
  homeVisitReasonDescription?: string;
}
