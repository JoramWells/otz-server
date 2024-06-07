import { type AdherenceEntity } from '../../../domain/entities/art/AdherenceEntity'

export interface IPillUptakeInteractor {
  createPillUptake: (data: AdherenceEntity) => Promise<AdherenceEntity>
  getAllPillUptakes: () => Promise<AdherenceEntity[]>
  getPillUptakeById: (id: string) => Promise<AdherenceEntity | null>
  editPillUptake: (id: string, status: boolean, queryString: ParsedQs) => Promise<AdherenceEntity | null>
  getDailyPillUptakeCount: () => Promise<AdherenceEntity | null>
}
