import { type UserInterface } from '../models/allergies.model'

export class UserEntity implements UserInterface {
  constructor (
    public firstName: string,
    public middleName: string,
    public sex: string,
    public dob: string,
    public idNo: string,
    public countyID: string,
    public email: string,
    public id?: string,
    public lastName?: string,
    public phoneNo?: string,
    public password?: string

  ) {}
}
