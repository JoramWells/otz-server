// import { type Patient } from '../../domain/entities/PatientEntity'
import { type PAMAProfileEntity } from '../../domain/entities/PAMAProfileEntity'
import { type IPAMAInteractor } from '../interfaces/IPAMAInteractor'
import { type IPAMARepository } from '../interfaces/IPAMARepository'

export class PAMAInteractor implements IPAMAInteractor {
  private readonly repository: IPAMARepository

  constructor (repository: IPAMARepository) {
    this.repository = repository
  }

  async getPAMAById (id: string): Promise<PAMAProfileEntity | null> {
    return await this.repository.findById(id)
  }

  async createPAMA (
    patientData: PAMAProfileEntity
  ): Promise<PAMAProfileEntity> {
    return await this.repository.create(patientData)
  }

  async getAllPAMAs (): Promise<PAMAProfileEntity[]> {
    return await this.repository.find()
  }
}
