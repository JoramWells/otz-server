import { type Patient } from '../../domain/entities/Patient'

export interface IPatientInteractor {
  createPatient: (patientData: any) => Promise<Patient>
  getAllPatients: () => Promise<Patient[]>
  getPatientById: (id: string) => Promise<Patient>
}
