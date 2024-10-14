import { PatientSessionLogInterface } from "otz-types";

export interface IPatientSessionInteractor {
  createPatientSession: (patientData: PatientSessionLogInterface) => Promise<string | null>
  getAllPatientSessions: () => Promise<PatientSessionLogInterface[]>
  getPatientSessionById: (id: string) => Promise<PatientSessionLogInterface | null>
  editPatientSession: (data: PatientSessionLogInterface) => Promise<PatientSessionLogInterface | null>
  deletePatientSession: (id: string) => Promise<number | null>;

}
