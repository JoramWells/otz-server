import { type ARTCategoryEntity } from '../../../domain/entities/art/ARTCategoryEntity'

export interface IARTCategoryRepository {
  create: (data: ARTCategoryEntity) => Promise<ARTCategoryEntity | null>
  find: () => Promise<ARTCategoryEntity[]>
  findById: (id: string) => Promise<ARTCategoryEntity | null>
}
