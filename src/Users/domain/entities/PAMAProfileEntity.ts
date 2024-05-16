import { type PAMAInterface } from '../models/pama/pamaProfile.models'

export class PAMAProfileEntity implements PAMAInterface {
  constructor (
    public childID: string,
    public primaryCaregiverID: string,
    public dateOfEnrollment: Date,
    public noOfCaregivers: number,
    public isPaired: boolean,
    public id?: string
  ) {}
}
