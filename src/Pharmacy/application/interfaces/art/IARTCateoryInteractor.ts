import { ArtCategoryInterface } from "otz-types"

export interface IARTCategoryInteractor {
  createARTCategory: (data: ArtCategoryInterface) => Promise<ArtCategoryInterface | null>
  getAllARTCategories: () => Promise<ArtCategoryInterface[]>
  getARTCategoryById: (id: string) => Promise<ArtCategoryInterface | null>
}
