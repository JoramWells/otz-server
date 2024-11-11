import { PatientVisitsInterface } from "otz-types"

export interface IPatientVisitInteractor {
  createPatientVisit: (patientData: PatientVisitsInterface) => Promise<PatientVisitsInterface | null>
  getAllPatientVisits: () => Promise<PatientVisitsInterface[]>
  getPatientVisitById: (id: string) => Promise<PatientVisitsInterface | null>
  getHistoryPatientVisitById: (id: string) => Promise<PatientVisitsInterface[] | null>
  getPatientVisitByUserId: (userID: string) => Promise<PatientVisitsInterface[] | null>
  getUserPatientCount: (id: string) => Promise<PatientVisitsInterface[] | null>
}
