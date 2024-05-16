import { type AdverseDrugReactionsInterface } from '../models/adverseDrugReactions.model'

export class AdverseDrugReactionsEntity implements AdverseDrugReactionsInterface {
  constructor (
    public id: string,
    public patientID: string,
    public medicine: string,
    public severity: string,
    public onSetDate: Date,
    public actionTaken: string,
    public reaction: string
  ) {}
}
