import { type PatientVisitsEntity } from '../../domain/entities/PatientVisitsEntity'

export interface IPatientVisitsRepository {
  create: (data: PatientVisitsEntity) => Promise<PatientVisitsEntity | null>
  find: () => Promise<PatientVisitsEntity[]>
  findById: (id: string) => Promise<PatientVisitsEntity | null>
}
