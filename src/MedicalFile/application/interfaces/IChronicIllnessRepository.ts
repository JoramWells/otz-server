import { type ChronicIllnessEntity } from '../../domain/entities/ChronicIllnessEntity'

export interface IChronicIllnessRepository {
  create: (data: ChronicIllnessEntity) => Promise<ChronicIllnessEntity | null>
  find: () => Promise<ChronicIllnessEntity[]>
  findById: (id: string) => Promise<ChronicIllnessEntity | null>
}
