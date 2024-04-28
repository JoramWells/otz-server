import { type PatientEntity } from '../../domain/entities/PatientEntity'

export interface IPatientInteractor {
  createPatient: (patientData: PatientEntity) => Promise<PatientEntity>
  getAllPatients: () => Promise<PatientEntity[]>
  getPatientById: (id: string) => Promise<PatientEntity | null>
}
