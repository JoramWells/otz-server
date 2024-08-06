import { NextOfKinInterface, PatientAttributes } from "otz-types"

export interface IPatientRepository {
  create: (data: PatientAttributes, nextOfKinData: NextOfKinInterface) => Promise<string | null>
  find: () => Promise<PatientAttributes[]>
  findById: (id: string) => Promise<PatientAttributes | null>
  important: (id: string, isImportant: boolean) => Promise<string | null>
  edit: (data: PatientAttributes) => Promise<PatientAttributes | null>
  findAllPMTCTPatients: () => Promise <PatientAttributes[]>
  findOTZ: () => Promise <PatientAttributes[]>
  login: (firstName: string, password: string) => Promise<PatientAttributes | null>

}
