import { type AdverseDrugReactionsEntity } from '../../domain/entities/AdverseDrugReactionsEntity'

export interface IAdverseDrugReactionsRepository {
  create: (data: AdverseDrugReactionsEntity) => Promise<AdverseDrugReactionsEntity | null>
  find: () => Promise<AdverseDrugReactionsEntity[]>
  findById: (id: string) => Promise<AdverseDrugReactionsEntity | null>
}
