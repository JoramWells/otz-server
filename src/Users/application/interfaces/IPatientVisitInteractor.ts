import { type PatientVisitsEntity } from '../../domain/entities/PatientVisitsEntity'

export interface IPatientVisitInteractor {
  createPatientVisit: (patientData: PatientVisitsEntity) => Promise<PatientVisitsEntity | null>
  getAllPatientVisits: () => Promise<PatientVisitsEntity[]>
  getPatientVisitById: (id: string) => Promise<PatientVisitsEntity | null>
  getHistoryPatientVisitById: (id: string) => Promise<PatientVisitsEntity[] | null>
}
