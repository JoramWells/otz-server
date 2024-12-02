import { PatientVisitsInterface } from "otz-types"
import { PatientVisitResponseInterface } from "../../entities/PatientVisitResponseInterface";

export interface IPatientVisitsRepository {
  create: (
    data: PatientVisitsInterface
  ) => Promise<PatientVisitsInterface | null>;
  find: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<PatientVisitResponseInterface | undefined | null>;
  findById: (id: string) => Promise<PatientVisitsInterface | null>;
  findHistoryById: (
    id: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<PatientVisitResponseInterface| null | undefined>;
  findPatientVisitByUserId: (
    userID: string
  ) => Promise<PatientVisitsInterface[] | null>;
  findUserPatientCount: (
    id: string
  ) => Promise<PatientVisitsInterface[] | null>;
  findUserActivitiesCount: (
    id: string
  ) => Promise<PatientVisitsInterface[] | null>;
}
