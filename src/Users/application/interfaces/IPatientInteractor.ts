import { type NextOfKinEntity } from '../../domain/entities/NextOfKinEntity'
import { type PatientEntity } from '../../domain/entities/PatientEntity'

export interface IPatientInteractor {
  createPatient: (patientData: PatientEntity, nextOfKinData: NextOfKinEntity) => Promise<string | null>
  getAllPatients: () => Promise<PatientEntity[]>
  getPatientById: (id: string) => Promise<PatientEntity | null>
  findAllPMTCTPatients: () => Promise <PatientEntity[]>
  findAllOTZPatients: () => Promise <PatientEntity[]>
  editPatient: (data: PatientEntity) => Promise<PatientEntity | null>

}
