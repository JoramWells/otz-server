import { type CaregiverInterface } from '../models/caregiver.model'

export class CaregiverEntity implements CaregiverInterface {
  constructor (
    public firstName: string,
    public middleName: string,
    public phoneNo: string,
    public sex: string,
    public dob: string,
    public idNo: string,
    public countyID: string,
    public patientID: string,
    public careerID: string,
    public maritalStatus: string,
    public relationship: string,
    public id?: string,
    public drugs?: string,
    public lastName?: string,
    public password?: string,
    public email?: string

  ) {}
}
