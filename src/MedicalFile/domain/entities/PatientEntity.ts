import { type PatientAttributes } from '../models/patients.models'

export class PatientEntity implements PatientAttributes {
  constructor (
    public firstName?: string,
    public middleName?: string,
    public sex?: string,
    public phoneNo?: string,
    public idNo?: string,
    public occupationID?: string,
    public cccNo?: string,
    public dob?: string,
    public ageAtReporting?: string,
    public dateConfirmedPositive?: string,
    public initialRegimen?: string,
    public populationType?: string,
    public schoolID?: string,
    public hospitalID?: string,
    public subCountyName?: string,
    //
    public id?: string,
    public lastName?: string
  ) {}
}
