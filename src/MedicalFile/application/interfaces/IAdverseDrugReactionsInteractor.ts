import { type AdverseDrugReactionsEntity } from '../../domain/entities/AdverseDrugReactionsEntity'

export interface IAdverseDrugReactionsInteractor {
  createAdverseDrugReactions: (patientData: AdverseDrugReactionsEntity) => Promise<AdverseDrugReactionsEntity | null>
  getAllAdverseDrugReactions: () => Promise<AdverseDrugReactionsEntity[]>
  getAdverseDrugReactionsById: (id: string) => Promise<AdverseDrugReactionsEntity | null>
}
