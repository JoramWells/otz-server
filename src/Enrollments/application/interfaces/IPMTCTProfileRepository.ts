import { type PMTCTProfileEntity } from '../../domain/entities/PMTCTProfileEntity'

export interface IPMTCTProfileRepository {
  create: (data: PMTCTProfileEntity) => Promise<PMTCTProfileEntity>
  find: () => Promise<PMTCTProfileEntity[]>
  findById: (id: string) => Promise<PMTCTProfileEntity | null>
}
