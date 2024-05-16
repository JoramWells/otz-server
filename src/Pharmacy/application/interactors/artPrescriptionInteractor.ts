import { type ARTPrescriptionEntity } from '../../domain/entities/art/ARTPrescriptionEntity'
import { type IARTPrescriptionInteractor } from '../interfaces/art/IARTPrescriptionInteractor'
import { type IARTPrescriptionRepository } from '../interfaces/art/IARTPrescriptionRepository'

export class ArtPrescriptionInteractor implements IARTPrescriptionInteractor {
  private readonly repository: IARTPrescriptionRepository

  constructor (repository: IARTPrescriptionRepository) {
    this.repository = repository
  }

  async getARTPrescriptionById (id: string): Promise<ARTPrescriptionEntity | null> {
    return await this.repository.findById(id)
  }

  async createARTPrescription (data: ARTPrescriptionEntity): Promise<ARTPrescriptionEntity | null> {
    return await this.repository.create(data)
  }

  async getAllARTPrescriptions (): Promise<ARTPrescriptionEntity[]> {
    return await this.repository.find()
  }
}
