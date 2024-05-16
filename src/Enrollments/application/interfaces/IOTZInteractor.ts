import { type OTZEntity } from '../../domain/entities/OTZEntity'

export interface IOTZInteractor {
  createOTZ: (data: OTZEntity) => Promise<OTZEntity>
  getAllOTZs: () => Promise<OTZEntity[]>
  getOTZById: (id: string) => Promise<OTZEntity | null>
}
