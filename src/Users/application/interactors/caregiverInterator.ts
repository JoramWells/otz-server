// import { type Patient } from '../../domain/entities/PatientEntity'
import { CaregiverInterface } from 'otz-types'
import { type ICaregiverInteractor } from '../interfaces/ICaregiverInteractor'
import { type ICaregiverRepository } from '../interfaces/ICaregiverRepository'

export class CaregiverInteractor implements ICaregiverInteractor {
  private readonly repository: ICaregiverRepository

  constructor (repository: ICaregiverRepository) {
    this.repository = repository
  }

  async getCaregiverById (id: string): Promise<CaregiverInterface[] | null> {
    return await this.repository.findById(id)
  }

  async createCaregiver (
    patientData: CaregiverInterface
  ): Promise<CaregiverInterface> {
    return await this.repository.create(patientData)
  }

  async getAllCaregivers (): Promise<CaregiverInterface[]> {
    return await this.repository.find()
  }
}
