import { type SystemExaminationInterface } from '../models/systemExamination.model'

export class SystemExaminationEntity implements SystemExaminationInterface {
  constructor (
    public id: string,
    public patientID: string,
    public appointmentID: string,
    public bodyPart: string,
    public findings: string,
    public notes: string,
    public isNormal: boolean
  ) {}
}
