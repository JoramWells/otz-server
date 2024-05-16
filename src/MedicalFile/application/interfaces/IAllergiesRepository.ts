import { type AllergiesEntity } from '../../domain/entities/AllergiesEntity'

export interface IAllergiesRepository {
  create: (data: AllergiesEntity) => Promise<AllergiesEntity | null>
  find: () => Promise<AllergiesEntity[]>
  findById: (id: string) => Promise<AllergiesEntity | null>
}
