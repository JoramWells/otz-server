import { type PrescriptionProps, type VLDataProps, type PAMAInterface } from '../models/pama/pamaProfile.models'

export class PAMAProfileEntity implements PAMAInterface {
  constructor (
    public childID: string,
    public primaryCaregiverID: string,
    public dateOfEnrollment: Date,
    public noOfCaregivers: number,
    public isPaired: boolean,
    public childVLStatus: VLDataProps,
    public childPrescriptionStatus: PrescriptionProps,
    public primaryCaregiverVLStatus: VLDataProps,
    public primaryCaregiverPrescriptionStatus: PrescriptionProps,
    public id?: string
  ) {}
}
