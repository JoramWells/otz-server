// import { type Patient } from '../../domain/entities/PatientEntity'
import { type ARTEntity } from '../../domain/entities/art/ARTEntity'
import { type IARTInteractor } from '../interfaces/art/IARTInteractor'
import { type IARTRepository } from '../interfaces/art/IARTRepository'

export class ARTInteractor implements IARTInteractor {
  private readonly repository: IARTRepository

  constructor (repository: IARTRepository) {
    this.repository = repository
  }

  async getARTById (id: string): Promise<ARTEntity | null> {
    return await this.repository.findById(id)
  }

  async createART (
    data: ARTEntity
  ): Promise<ARTEntity | null> {
    return await this.repository.create(data)
  }

  async getAllARTs (): Promise<ARTEntity[]> {
    return await this.repository.find()
  }
}
