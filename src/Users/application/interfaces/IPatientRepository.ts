import { type NextOfKinEntity } from '../../domain/entities/NextOfKinEntity'
import { type PatientEntity } from '../../domain/entities/PatientEntity'

export interface IPatientRepository {
  create: (data: PatientEntity, nextOfKinData: NextOfKinEntity) => Promise<string | null>
  find: () => Promise<PatientEntity[]>
  findById: (id: string) => Promise<PatientEntity | null>
  edit: (data: PatientEntity) => Promise<PatientEntity | null>
  findAllPMTCTPatients: () => Promise <PatientEntity[]>
  findOTZ: () => Promise <PatientEntity[]>
}
