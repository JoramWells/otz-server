import { type PAMAProfileEntity } from '../../../domain/entities/PAMAProfileEntity'

export interface IPAMAInteractor {
  createPAMA: (data: PAMAProfileEntity) => Promise<PAMAProfileEntity>
  getAllPAMAs: () => Promise<PAMAProfileEntity[]>
  getPAMAById: (id: string) => Promise<PAMAProfileEntity | null>
}
