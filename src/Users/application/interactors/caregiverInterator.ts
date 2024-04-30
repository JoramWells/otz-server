// import { type Patient } from '../../domain/entities/PatientEntity'
import { type CaseManagerEntity } from '../../domain/entities/CaseManagerEntity'
import { type ICaseManagerInteractor } from '../interfaces/ICaseManagerInteractor'
import { type ICaseManagerRepository } from '../interfaces/ICaseManagerRepository'

export class CaregiverInteractor implements ICaseManagerInteractor {
  private readonly repository: ICaseManagerRepository

  constructor (repository: ICaseManagerRepository) {
    this.repository = repository
  }

  async getCaseManagerById (id: string): Promise<CaseManagerEntity | null> {
    return await this.repository.findById(id)
  }

  async createCaseManager (patientData: CaseManagerEntity): Promise<CaseManagerEntity> {
    return await this.repository.create(patientData)
  }

  async getAllCaseManagers (): Promise<CaseManagerEntity[]> {
    return await this.repository.find()
  }
}
