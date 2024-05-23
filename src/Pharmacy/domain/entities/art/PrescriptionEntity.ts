import { type PrescriptionInterface } from '../../models/art/prescription.model'

export class PrescriptionEntity implements PrescriptionInterface {
  constructor (
    public patientID: string,
    public drugID: string,
    public noOfPills: number,
    public frequency: number,
    public refillDate: Date,
    public nextRefillDate: Date,
    public id?: string
  ) {}
}
