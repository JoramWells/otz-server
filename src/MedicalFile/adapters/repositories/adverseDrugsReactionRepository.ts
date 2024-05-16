/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IAdverseDrugReactionsRepository } from '../../application/interfaces/IAdverseDrugReactionsRepository'
import { type AdverseDrugReactionsEntity } from '../../domain/entities/AdverseDrugReactionsEntity'
import { AdverseDrugReactions } from '../../domain/models/adverseDrugReactions.model'

export class AdverseDrugsReactionRepository implements IAdverseDrugReactionsRepository {
  async create (data: AdverseDrugReactionsEntity): Promise<AdverseDrugReactionsEntity> {
    const results: AdverseDrugReactionsEntity = await AdverseDrugReactions.create(data)

    return results
  }

  async find (): Promise<AdverseDrugReactionsEntity[]> {
    const results = await AdverseDrugReactions.findAll({})
    return results
  }

  async findById (id: string): Promise<AdverseDrugReactionsEntity | null> {
    const results = await AdverseDrugReactions.findOne({
      where: {
        id
      }
    })

    return results
  }
}
