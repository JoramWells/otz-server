// import { type Patient } from '../../domain/entities/PatientEntity'
import { type OTZEntity } from '../../domain/entities/OTZEntity'
import { type IOTZInteractor } from '../interfaces/IOTZInteractor'
import { type IOTZRepository } from '../interfaces/IOTZRepository'

export class OTZInteractor implements IOTZInteractor {
  private readonly repository: IOTZRepository

  constructor (repository: IOTZRepository) {
    this.repository = repository
  }

  async getOTZById (id: string): Promise<OTZEntity | null> {
    return await this.repository.findById(id)
  }

  async createOTZ (
    patientData: OTZEntity
  ): Promise<OTZEntity> {
    return await this.repository.create(patientData)
  }

  async getAllOTZs (): Promise<OTZEntity[]> {
    return await this.repository.find()
  }
}
