import { type AdherenceEntity } from '../../domain/entities/art/AdherenceEntity'
import { type IPillUptakeInteractor } from '../interfaces/art/IPillUptakeInteractor'
import { type IPillUptakeRepository } from '../interfaces/art/IPillUptakeRepository'

export class PillUptakeInteractor implements IPillUptakeInteractor {
  private readonly repository: IPillUptakeRepository

  constructor (repository: IPillUptakeRepository) {
    this.repository = repository
  }

  async getDailyPillUptakeCount (): Promise<AdherenceEntity | null> {
    return await this.repository.count()
  }

  async getPillUptakeById (id: string): Promise<AdherenceEntity | null> {
    return await this.repository.findById(id)
  }

  async editPillUptake (id: string, status: boolean, queryString: string): Promise<AdherenceEntity | null> {
    return await this.repository.edit(id, status, queryString)
  }

  async createPillUptake (patientData: AdherenceEntity): Promise<AdherenceEntity> {
    return await this.repository.create(patientData)
  }

  async getAllPillUptakes (): Promise<AdherenceEntity[]> {
    return await this.repository.find()
  }
}
