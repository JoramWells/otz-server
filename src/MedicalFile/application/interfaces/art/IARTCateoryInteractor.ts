import { type ARTCategoryEntity } from '../../../domain/entities/art/ARTCategoryEntity'

export interface IARTCategoryInteractor {
  createARTCategory: (data: ARTCategoryEntity) => Promise<ARTCategoryEntity | null>
  getAllARTCategories: () => Promise<ARTCategoryEntity[]>
  getARTCategoryById: (id: string) => Promise<ARTCategoryEntity | null>
}
