// import { type Patient } from '../../domain/entities/PatientEntity'
import { ARTInterface } from 'otz-types'
import { type IARTInteractor } from '../interfaces/art/IARTInteractor'
import { type IARTRepository } from '../interfaces/art/IARTRepository'

export class ARTInteractor implements IARTInteractor {
  private readonly repository: IARTRepository

  constructor (repository: IARTRepository) {
    this.repository = repository
  }

  async getARTById (id: string): Promise<ARTInterface | null> {
    return await this.repository.findById(id)
  }

  async createART (
    data: ARTInterface
  ): Promise<ARTInterface | null> {
    return await this.repository.create(data)
  }

  async getAllARTs (): Promise<ARTInterface[]> {
    return await this.repository.find()
  }
}
