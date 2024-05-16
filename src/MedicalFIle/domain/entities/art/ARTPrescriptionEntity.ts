import { type ARTPrescriptionInterface } from '../../models/art/artPrescription.model'

export class ARTPrescriptionEntity implements ARTPrescriptionInterface {
  id!: string
  patientID!: string
  regimen!: string
  changeReason!: string
  stopReason!: string
  startDate!: Date
  changeDate!: Date
  stopDate!: Date
  isStandard!: string
  line!: string
}
