export interface HomeVisitAttributes {
  id?: string;
  patientID?: string;
  homeVisitReasonID?: string;
  userID?: string;
  dateRequested?: string;
  homeVisitFrequencyID?: string;
  artPrescription?: string;
  tbPrescription?: string;
  noOfPills?: number;
  medicineStatus?: string;
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

