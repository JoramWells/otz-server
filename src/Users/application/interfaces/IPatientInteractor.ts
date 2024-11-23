import { NextOfKinInterface, PatientAttributes } from "otz-types"

export interface IPatientInteractor {
  createPatient: (patientData: PatientAttributes, nextOfKinData: NextOfKinInterface) => Promise<string | null>
  getAllPatients: (hospitalID: string, page: number, pageSize: number, search: string) => Promise<PatientAttributes[] | null>
  getAllPatientUsers: () => Promise<PatientAttributes[]>
  getPatientById: (id: string) => Promise<PatientAttributes | null>
  getImportantPatient: (limit: number) => Promise<PatientAttributes[]>
  markAsImportant: (id: string, isImportant: boolean) => Promise<string | null>
  findAllPMTCTPatients: () => Promise <PatientAttributes[]>
  findAllOTZPatients: () => Promise <PatientAttributes[]>
  updateAvatar: (id: string, avatar: string) => Promise<PatientAttributes | null>
  updatePatientUsername: (id: string, username: string) => Promise<PatientAttributes | null>
  updatePatientPassword: (id: string, password: string) => Promise<PatientAttributes | null>
  editPatient: (data: PatientAttributes) => Promise<PatientAttributes | null>
  login: (cccNo: string, password: string) => Promise<PatientAttributes | null>
  deletePatient: (id: string) => Promise<number | null>;
  getPatientByUserId: (id: string) => Promise<PatientAttributes | null>;


}
