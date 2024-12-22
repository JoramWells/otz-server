import { HospitalAttributes } from "./hospital";

export enum PatientVisitType {
  SelfCare = "self care",
  ClinicalEncounter = "clinical encounter",
}
export interface PatientVisitsInterface {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  userID?: string;
  User?: UserInterface;
  type?: PatientVisitType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface InputProps {
  is: string;
  label: string;
}

export enum UserRoles {
  Admin = "admin",
  Clinician = "clinician",
  MentorMother = "mentor mother",
  Advocate = "advocate",
  Nurse = "nurse",
  patient = "patient",
}

export enum PatientRoles {
  Admin = "admin",
  Clinician = "clinician",
  MentorMother = "mentor mother",
  AYPAdvocate = "ayp advocate",
  Nurse = "nurse",
  patient = "patient",
}

export interface LocationProps {
  county: InputProps;
  subCounty: InputProps;
  ward: InputProps;
}
export interface PatientAttributes {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  sex?: string;
  dob?: Date | string;
  enrollmentDate?: Date | string;
  avatar?: string;
  phoneNo?: string;
  idNo?: string;
  password?: string;
  username?: string;
  userID?: string;
  NUPI?: string;
  occupationID?: string;
  cccNo?: string;
  ageAtReporting?: string;
  dateConfirmedPositive?: string;
  initialRegimen?: string;
  populationType?: string;
  schoolID?: string;
  hospitalID?: string;
  Hospital?: HospitalAttributes;
  entryPoint?: string;
  subCountyName?: string;
  maritalStatus: string;
  email?: string;
  isImportant?: boolean;
  role?: PatientRoles;
  location?: LocationProps;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PatientSessionLogInterface {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  connectedAt?: Date;
  disconnectedAt?: Date;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSessionLogInterface {
  id?: string;
  userID?: string;
  User?: UserInterface;
  connectedAt?: Date;
  disconnectedAt?: Date;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ImportantPatientsInterface {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  userID?: string;
  User?: UserInterface;
  isImportant?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInterface {
  id?: string;
  firstName: string;
  middleName: string;
  lastName?: string;
  email: string;
  sex: string;
  phoneNo?: string;
  countyID: string;
  password?: string;
  dob: string;
  idNo: string;
  hospitalID?: string;
  Hospital?: HospitalAttributes;
  role?: UserRoles;
}

export interface UserAvailabilityAttributes {
  id?: string;
  userID: string;
  User?: UserInterface;
  availability?: {
    available: boolean;
    day: string;
    startTime: Date;
    endTime: Date;
  }[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface NextOfKinInterface {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  firstName: string;
  middleName: string;
  lastName?: string;
  email?: string;
  sex: string;
  dob: string;
  phoneNo: string;
  drugs?: string;
  certificateNo?: string;
  idNo: string;
  relationship: string;
}

export interface CaseManagerInterface {
  id?: string;
  patientID: string;
  Patient?: PatientAttributes;
  userID: string;
  isNotification: boolean;
}

export interface CaregiverInterface {
  id?: string;
  patientID: string;
  Patient?: PatientAttributes;
  firstName: string;
  middleName: string;
  lastName?: string;
  email?: string;
  sex: string;
  dob: string;
  phoneNo: string;
  drugs?: string;
  careerID: string;
  maritalStatus: string;
  idNo: string;
  relationship: string;
  countyID: string;
}

export interface CALHIVInterface {
  id?: string;
  hospitalID?: string;
  Hospital?: HospitalAttributes
  age_0_9?: string;
  age_10_14?: string;
  age_15_19?: string;
  age_20_24?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface PaginatedResponseInterface<T> {
  data: T[];
  total?: string | number;
  page?: string | number;
  pageSize?: string | number;
}

export interface TransferOutInterface {
  id?: string;
  patientID?: string;
  Patient?: PatientAttributes;
  userID?: string;
  User?: UserInterface;
  transferOutDate?: string | Date;
  transferOutEffectiveDate?: string | Date;
  transferOutVerified?: boolean;
  transferOutVerificationDate?: string | Date;
  transferredTo?: string;
  Hospital?: HospitalAttributes;
  lastAppointmentDate?: string | Date;
  lastVisitDate?: string | Date;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface TransferInInterface {
  id?: string;
  confirmedBy?: string;
  User?: UserInterface;
  transferInDate?: string | Date;
  transferInEffectiveDate?: string | Date;
  transferInVerified?: boolean;
  transferInVerificationDate?: string | Date;
  transferOutID?: string;
  TransferOut?: TransferOutInterface;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
