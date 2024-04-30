// import { type Patient } from '../../domain/entities/PatientEntity'
import { type CaregiverEntity } from '../../domain/entities/CaregiverEntity'
import { type ICaregiverInteractor } from '../interfaces/ICaregiverInteractor'
import { type ICaregiverRepository } from '../interfaces/ICaregiverRepository'

export class CaregiverInteractor implements ICaregiverInteractor {
  private readonly repository: ICaregiverRepository

  constructor (repository: ICaregiverRepository) {
    this.repository = repository
  }

  async getCaregiverById (id: string): Promise<CaregiverEntity | null> {
    return await this.repository.findById(id)
  }

  async createCaregiver (
    patientData: CaregiverEntity
  ): Promise<CaregiverEntity> {
    return await this.repository.create(patientData)
  }

  async getAllCaregivers (): Promise<CaregiverEntity[]> {
    return await this.repository.find()
  }
}
