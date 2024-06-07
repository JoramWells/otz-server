import { type AdherenceEntity } from '../../../domain/entities/art/AdherenceEntity'

export interface IPillUptakeRepository {
  create: (data: AdherenceEntity) => Promise<AdherenceEntity>
  find: () => Promise<AdherenceEntity[]>
  findById: (id: string) => Promise<AdherenceEntity | null>
  edit: (id: string, status: boolean, queryString: ParsedQs) => Promise<AdherenceEntity | null>
  count: () => Promise<AdherenceEntity | null>
}
