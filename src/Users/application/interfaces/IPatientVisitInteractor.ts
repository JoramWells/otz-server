import { PatientVisitsInterface } from "otz-types"
import { PatientVisitResponseInterface } from "../../entities/PatientVisitResponseInterface";

export interface IPatientVisitInteractor {
  createPatientVisit: (
    patientData: PatientVisitsInterface
  ) => Promise<PatientVisitsInterface | null>;
  getAllPatientVisits: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string,
  ) => Promise<PatientVisitResponseInterface | undefined | null>;
  getPatientVisitById: (id: string) => Promise<PatientVisitsInterface | null>;
  getHistoryPatientVisitById: (
    id: string
  ) => Promise<PatientVisitsInterface[] | null>;
  getPatientVisitByUserId: (
    userID: string
  ) => Promise<PatientVisitsInterface[] | null>;
  getUserPatientCount: (id: string) => Promise<PatientVisitsInterface[] | null>;
  getUserActivitiesCount: (
    id: string
  ) => Promise<PatientVisitsInterface[] | null>;
}
