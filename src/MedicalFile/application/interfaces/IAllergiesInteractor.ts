import { type AllergiesEntity } from '../../domain/entities/AllergiesEntity'

export interface IAllergiesInteractor {
  createAllergies: (data: AllergiesEntity) => Promise<AllergiesEntity | null>
  getAllAllergies: () => Promise<AllergiesEntity[]>
  getAllergiesById: (id: string) => Promise<AllergiesEntity | null>
}
