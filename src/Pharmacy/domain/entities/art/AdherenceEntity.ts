import { type AdherenceAttributes } from '../../models/adherence/adherence.model'

export class AdherenceEntity implements AdherenceAttributes {
  constructor (
    public timeAndWorkID: string,
    public prescriptionID: string,
    public currentDate: Date,
    public morningStatus: boolean,
    public eveningStatus: boolean,
    public id?: string
  ) {}
}
