import { type PMTCTProfileEntity } from '../../domain/entities/PMTCTProfileEntity'

export interface IPMTCTProfileInteractor {
  createPMTCTProfile: (data: PMTCTProfileEntity) => Promise<PMTCTProfileEntity>
  getAllPMTCTProfiles: () => Promise<PMTCTProfileEntity[]>
  getPMTCTProfileById: (id: string) => Promise<PMTCTProfileEntity | null>
}
