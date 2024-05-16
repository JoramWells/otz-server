import { type NextOfKinInterface } from '../models/nextOfKin.model'

export class NextOfKinEntity implements NextOfKinInterface {
  constructor (
    public firstName: string,
    public middleName: string,
    public phoneNo: string,
    public sex: string,
    public dob: string,
    public idNo: string,
    public relationship: string,
    public id?: string,
    public drugs?: string,
    public lastName?: string,
    public password?: string,
    public email?: string,
    public patientID?: string,
    public certificateNo?: string

  ) {}
}
