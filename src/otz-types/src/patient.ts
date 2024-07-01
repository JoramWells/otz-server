import { WeekDays } from "./weekdays";

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
}



export interface UserAvailabilityAttributes {
  id?: string;
  userID: string;
  daysAvailable: WeekDays;
  startTime: Date;
  endTime: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
