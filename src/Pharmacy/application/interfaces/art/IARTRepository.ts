import { type ARTEntity } from '../../../domain/entities/art/ARTEntity'

export interface IARTRepository {
  create: (data: ARTEntity) => Promise<ARTEntity | null>
  find: () => Promise<ARTEntity[]>
  findById: (id: string) => Promise<ARTEntity | null>
}
