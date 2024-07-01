// import { type Patient } from '../../domain/entities/PatientEntity'
import { ArtCategoryInterface } from 'otz-types'
import { type IARTCategoryRepository } from '../interfaces/art/IARTCategoryRepository'
import { type IARTCategoryInteractor } from '../interfaces/art/IARTCateoryInteractor'

export class ArtCategoryInteractor implements IARTCategoryInteractor {
  private readonly repository: IARTCategoryRepository

  constructor (repository: IARTCategoryRepository) {
    this.repository = repository
  }

  async getARTCategoryById (id: string): Promise<ArtCategoryInterface | null> {
    return await this.repository.findById(id)
  }

  async createARTCategory (data: ArtCategoryInterface): Promise<ArtCategoryInterface | null> {
    return await this.repository.create(data)
  }

  async getAllARTCategories (): Promise<ArtCategoryInterface[]> {
    return await this.repository.find()
  }
}
