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
    searchQuery: string
  ) => Promise<PatientVisitResponseInterface | undefined | null>;
  getPatientVisitById: (id: string) => Promise<PatientVisitsInterface | null>;
  getHistoryPatientVisitById: (
    id: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<PatientVisitResponseInterface | null | undefined>;
  getPatientVisitByUserId: (
    userID: string
  ) => Promise<PatientVisitsInterface[] | null>;
  getUserPatientCount: (id: string) => Promise<PatientVisitsInterface[] | null>;
  getPatientVisitByCount: (id: string) => Promise<PatientVisitsInterface[] | null | undefined>;
  getUserActivitiesCount: (
    id: string
  ) => Promise<PatientVisitsInterface[] | null>;
}
