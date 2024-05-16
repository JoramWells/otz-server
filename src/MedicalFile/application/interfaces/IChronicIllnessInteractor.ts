import { type ChronicIllnessEntity } from '../../domain/entities/ChronicIllnessEntity'

export interface IChronicIllnessInteractor {
  createChronicIllness: (data: any) => Promise<ChronicIllnessEntity | null>
  getAllChronicIllness: () => Promise<ChronicIllnessEntity[]>
  getChronicIllnessById: (id: string) => Promise<ChronicIllnessEntity | null>
}
