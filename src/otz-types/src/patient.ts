import { WeekDays } from "./weekdays";


export enum PatientVisitType {
  SelfCare = 'self care',
  ClinicalEncounter = 'clinical encounter'
}
export interface PatientVisitsInterface {
  id?: string;
  patientID?: string;
  userID?: string;
  type?: PatientVisitType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface InputProps {
  is: string;
  label: string;
}

export enum UserRoles{
  Admin = 'admin',
  Clinician= 'clinician',
  MentorMother = 'mentor mother',
  AYPAdvocate = 'ayp advocate',
  Nurse = 'nurse',
  patient='patient'
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
  entryPoint?: string;
  subCountyName?: string;
  maritalStatus: string;
  email?: string;
  isImportant?: boolean;
  role: UserRoles;
  location?: LocationProps;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PatientSessionLogInterface {
  id?: string;
  patientID?: string;
  connectedAt?: Date;
  disconnectedAt?: Date;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSessionLogInterface {
  id?: string;
  userID?: string;
  connectedAt?: Date;
  disconnectedAt?: Date;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ImportantPatientsInterface {
  id?: string;
  patientID?: string;
  userID?: string;
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
}



export interface UserAvailabilityAttributes {
  id?: string;
  userID: string;
  availability?: {
    available: boolean
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
  userID: string;
  isNotification: boolean;
}

export interface CaregiverInterface {
  id?: string;
  patientID: string;
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

