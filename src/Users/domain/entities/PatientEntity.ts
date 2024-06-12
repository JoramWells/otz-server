import { type LocationProps, type PatientAttributes } from '../models/patients.models'

export class PatientEntity implements PatientAttributes {
  constructor (
    public maritalStatus: string,
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
    //
    public location?: LocationProps,

    public id?: string,
    public lastName?: string,
    public entryPoint?: string,
    public subCountyName?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
