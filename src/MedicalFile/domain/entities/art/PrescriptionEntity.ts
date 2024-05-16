import { type PrescriptionInterface } from '../../models/art/prescription.model'

export class PrescriptionEntity implements PrescriptionInterface {
  constructor (
    public id: string,
    public patientID: string,
    public drugID: string,
    public noOfPills: number,
    public frequency: number,
    public refillDate: Date
  ) {}
}
