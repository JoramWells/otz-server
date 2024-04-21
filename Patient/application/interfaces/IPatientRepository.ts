import { type PatientEntity } from '../../domain/entities/PatientEntity'

export interface IPatientRepository {
  create: (data: PatientEntity) => Promise<PatientEntity>
  find: () => Promise<PatientEntity[]>
  findById: (id: string) => Promise<PatientEntity>
}
