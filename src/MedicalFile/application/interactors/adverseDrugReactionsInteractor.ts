// import { type Patient } from '../../domain/entities/PatientEntity'
import { type AdverseDrugReactionsEntity } from '../../domain/entities/AdverseDrugReactionsEntity'
import { type IAdverseDrugReactionsInteractor } from '../interfaces/IAdverseDrugReactionsInteractor'
import { type IAdverseDrugReactionsRepository } from '../interfaces/IAdverseDrugReactionsRepository'

export class AdverseDrugReactionsInteractor
implements IAdverseDrugReactionsInteractor {
  private readonly repository: IAdverseDrugReactionsRepository

  constructor (repository: IAdverseDrugReactionsRepository) {
    this.repository = repository
  }

  async getAdverseDrugReactionsById (
    id: string
  ): Promise<AdverseDrugReactionsEntity | null> {
    return await this.repository.findById(id)
  }

  async createAdverseDrugReactions (
    data: AdverseDrugReactionsEntity
  ): Promise<AdverseDrugReactionsEntity | null> {
    return await this.repository.create(data)
  }

  async getAllAdverseDrugReactions (): Promise<AdverseDrugReactionsEntity[]> {
    return await this.repository.find()
  }
}
