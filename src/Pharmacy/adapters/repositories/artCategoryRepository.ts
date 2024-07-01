/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { ArtCategoryInterface } from 'otz-types'
import { type IARTCategoryRepository } from '../../application/interfaces/art/IARTCategoryRepository'
import { ArtCategory } from '../../domain/models/art/artCategory.model'

export class ARTCategoryRepository implements IARTCategoryRepository {
  async create (data: ArtCategoryInterface): Promise<ArtCategoryInterface> {
    const results: ArtCategoryInterface = await ArtCategory.create(data)

    return results
  }

  async find (): Promise<ArtCategoryInterface[]> {
    const results = await ArtCategory.findAll({})
    return results
  }

  async findById (id: string): Promise<ArtCategoryInterface | null> {
    const results = await ArtCategory.findOne({
      where: {
        id
      }
    })

    return results
  }
}
