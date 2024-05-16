import { type OTZEntity } from '../../domain/entities/OTZEntity'

export interface IOTZRepository {
  create: (data: OTZEntity) => Promise<OTZEntity>
  find: () => Promise<OTZEntity[]>
  findById: (id: string) => Promise<OTZEntity | null>
}
