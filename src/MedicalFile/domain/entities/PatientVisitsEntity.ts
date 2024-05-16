import { type PatientVisitsInterface } from '../models/patientVisits.model'

export class PatientVisitsEntity implements PatientVisitsInterface {
  constructor (
    public patientID?: string,
    public id?: string
  ) {}
}
