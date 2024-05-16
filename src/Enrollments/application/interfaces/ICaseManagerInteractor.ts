import { type CaseManagerEntity } from '../../domain/entities/CaseManagerEntity'

export interface ICaseManagerInteractor {
  createCaseManager: (patientData: CaseManagerEntity) => Promise<CaseManagerEntity>
  getAllCaseManagers: () => Promise<CaseManagerEntity[]>
  getCaseManagerById: (id: string) => Promise<CaseManagerEntity | null>
}
