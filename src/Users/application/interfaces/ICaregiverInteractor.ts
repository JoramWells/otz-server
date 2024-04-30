import { type CaregiverEntity } from '../../domain/entities/CaregiverEntity'

export interface ICaregiverInteractor {
  createCaregiver: (patientData: CaregiverEntity) => Promise<CaregiverEntity>
  getAllCaregivers: () => Promise<CaregiverEntity[]>
  getCaregiverById: (id: string) => Promise<CaregiverEntity | null>
}
