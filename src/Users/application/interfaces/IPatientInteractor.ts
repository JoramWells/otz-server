import { NextOfKinInterface, PatientAttributes } from "otz-types"

export interface IPatientInteractor {
  createPatient: (patientData: PatientAttributes, nextOfKinData: NextOfKinInterface) => Promise<string | null>
  getAllPatients: () => Promise<PatientAttributes[]>
  getPatientById: (id: string) => Promise<PatientAttributes | null>
  findAllPMTCTPatients: () => Promise <PatientAttributes[]>
  findAllOTZPatients: () => Promise <PatientAttributes[]>
  editPatient: (data: PatientAttributes) => Promise<PatientAttributes | null>
  login: (firstName: string, password: string) => Promise<PatientAttributes | null>

}
