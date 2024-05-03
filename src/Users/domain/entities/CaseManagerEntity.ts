import { type CaseManagerInterface } from '../models/casemanager.model'

export class CaseManagerEntity implements CaseManagerInterface {
  constructor (
    public patientID: string,
    public userID: string,
    public isNotification: boolean,
    public id?: string
  ) {}
}
