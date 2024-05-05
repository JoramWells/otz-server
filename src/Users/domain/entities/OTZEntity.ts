import { type OTZInterface } from '../models/enrollment/otz.model'

export class OTZEntity implements OTZInterface {
  constructor (
    public id: string,
    public patientID: string,
    public dateOfEnrollmentToOTZ: Date,
    public vlResults: string,
    public dateOfVL: Date,
    public isValid: boolean,
    public currentARTRegimen: string,
    public currentARTStartDate: Date,
    public currentRegimenLine: string
  ) {}
}
