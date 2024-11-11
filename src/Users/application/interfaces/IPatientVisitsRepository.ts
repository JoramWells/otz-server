import { PatientVisitsInterface } from "otz-types"

export interface IPatientVisitsRepository {
  create: (
    data: PatientVisitsInterface
  ) => Promise<PatientVisitsInterface | null>;
  find: () => Promise<PatientVisitsInterface[]>;
  findById: (id: string) => Promise<PatientVisitsInterface | null>;
  findHistoryById: (id: string) => Promise<PatientVisitsInterface[] | null>;
  findPatientVisitByUserId: (userID: string) => Promise<PatientVisitsInterface[] | null>;
  findUserPatientCount: (id: string) => Promise<PatientVisitsInterface[] | null>;
}
