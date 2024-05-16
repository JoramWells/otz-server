import { type PatientAllergiesEntity } from '../../domain/entities/PatientAllergiesEntity'

export interface IPatientAllergiesRepository {
  create: (data: PatientAllergiesEntity) => Promise<PatientAllergiesEntity>
  find: () => Promise<PatientAllergiesEntity[]>
  findById: (id: string) => Promise<PatientAllergiesEntity | null>
}
