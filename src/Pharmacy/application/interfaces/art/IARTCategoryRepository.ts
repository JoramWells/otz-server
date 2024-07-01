import { ArtCategoryInterface } from "otz-types"

export interface IARTCategoryRepository {
  create: (data: ArtCategoryInterface) => Promise<ArtCategoryInterface | null>
  find: () => Promise<ArtCategoryInterface[]>
  findById: (id: string) => Promise<ArtCategoryInterface | null>
}
