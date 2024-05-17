import { type PatientAllergiesInterface } from '../models/patientAllergies.model'

export class PatientAllergiesEntity implements PatientAllergiesInterface {
  constructor (
    public id: string,
    public allergyName: string,
    public allergyReaction: string,
    public severity: string,
    public patientID: string,
    public onSetDate: Date
  ) {}
}
