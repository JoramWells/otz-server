import { type ChronicIllnessEntity } from '../../domain/entities/ChronicIllnessEntity'
import { type IChronicIllnessInteractor } from '../interfaces/IChronicIllnessInteractor'
import { type IChronicIllnessRepository } from '../interfaces/IChronicIllnessRepository'

export class ChronicIllnessInteractor implements IChronicIllnessInteractor {
  private readonly repository: IChronicIllnessRepository

  constructor (repository: IChronicIllnessRepository) {
    this.repository = repository
  }

  async getChronicIllnessById (id: string): Promise<ChronicIllnessEntity | null> {
    return await this.repository.findById(id)
  }

  async createChronicIllness (data: ChronicIllnessEntity): Promise<ChronicIllnessEntity | null> {
    return await this.repository.create(data)
  }

  async getAllChronicIllness (): Promise<ChronicIllnessEntity[]> {
    return await this.repository.find()
  }
}
