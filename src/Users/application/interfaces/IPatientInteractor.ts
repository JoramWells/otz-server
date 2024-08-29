import { NextOfKinInterface, PatientAttributes } from "otz-types"

export interface IPatientInteractor {
  createPatient: (patientData: PatientAttributes, nextOfKinData: NextOfKinInterface) => Promise<string | null>
  getAllPatients: () => Promise<PatientAttributes[]>
  getPatientById: (id: string) => Promise<PatientAttributes | null>
  getImportantPatient: (limit: number) => Promise<PatientAttributes[]>
  markAsImportant: (id: string, isImportant: boolean) => Promise<string | null>
  findAllPMTCTPatients: () => Promise <PatientAttributes[]>
  findAllOTZPatients: () => Promise <PatientAttributes[]>
  editPatient: (data: PatientAttributes) => Promise<PatientAttributes | null>
  login: (firstName: string, password: string) => Promise<PatientAttributes | null>
  deletePatient: (id: string) => Promise<number | null>;

}
