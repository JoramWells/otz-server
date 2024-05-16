import { type PatientAllergiesInterface } from '../models/patientAllergies.model'

export class PatientAllergiesEntity implements PatientAllergiesInterface {
  constructor (
    public id: string,
    public allergyID: string,
    public patientID: string,
    public onSetDate: Date
  ) {}
}
