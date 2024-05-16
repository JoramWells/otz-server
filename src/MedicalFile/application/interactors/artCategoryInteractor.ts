// import { type Patient } from '../../domain/entities/PatientEntity'
import { type ARTCategoryEntity } from '../../domain/entities/art/ARTCategoryEntity'
import { type IARTCategoryRepository } from '../interfaces/art/IARTCategoryRepository'
import { type IARTCategoryInteractor } from '../interfaces/art/IARTCateoryInteractor'

export class ArtCategoryInteractor implements IARTCategoryInteractor {
  private readonly repository: IARTCategoryRepository

  constructor (repository: IARTCategoryRepository) {
    this.repository = repository
  }

  async getARTCategoryById (id: string): Promise<ARTCategoryEntity | null> {
    return await this.repository.findById(id)
  }

  async createARTCategory (data: ARTCategoryEntity): Promise<ARTCategoryEntity | null> {
    return await this.repository.create(data)
  }

  async getAllARTCategories (): Promise<ARTCategoryEntity[]> {
    return await this.repository.find()
  }
}
