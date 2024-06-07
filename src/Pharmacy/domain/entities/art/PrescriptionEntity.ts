import { type PrescriptionInterface } from '../../models/art/prescription.model'

export class PrescriptionEntity implements PrescriptionInterface {
  constructor (
    public patientID: string,
    public patientVisitID: string,
    public drugID: string,
    public noOfPills: number,
    public frequency: number,
    public refillDate: Date,
    public nextRefillDate: Date,
    public expectedNoOfPills: number,
    public updatedAtExpectedNoOfPills: Date,
    public computedNoOfPills: number,

    public id?: string
  ) {}
}
