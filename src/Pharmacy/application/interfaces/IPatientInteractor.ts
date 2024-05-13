import { type PatientEntity } from '../../domain/entities/PatientEntity'

export interface IPatientInteractor {
  createPatient: (patientData: PatientEntity) => Promise<string | null>
  getAllPatients: () => Promise<PatientEntity[]>
  getPatientById: (id: string) => Promise<PatientEntity | null>
}
