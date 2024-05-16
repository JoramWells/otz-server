import { type ChronicIllnessInterface } from '../models/chronicIllness.model'

export class ChronicIllnessEntity implements ChronicIllnessInterface {
  constructor (
    public patientID: string,
    public illness: string,
    public onSetDate: Date,
    public id?: string
  ) {}
}
