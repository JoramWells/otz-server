import { type PatientAllergiesEntity } from '../../domain/entities/PatientAllergiesEntity'

export interface IPatientAllergiesInteractor {
  createPatientAllergies: (data: any) => Promise<PatientAllergiesEntity | null>
  getAllPatientAllergies: () => Promise<PatientAllergiesEntity[]>
  getPatientAllergiesById: (id: string) => Promise<PatientAllergiesEntity | null>
}
