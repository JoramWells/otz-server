/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IARTCategoryRepository } from '../../application/interfaces/art/IARTCategoryRepository'
import { type ARTCategoryEntity } from '../../domain/entities/art/ARTCategoryEntity'
import { ArtCategory } from '../../domain/models/art/artCategory.model'

export class ARTCategoryRepository implements IARTCategoryRepository {
  async create (data: ARTCategoryEntity): Promise<ARTCategoryEntity> {
    const results: ARTCategoryEntity = await ArtCategory.create(data)

    return results
  }

  async find (): Promise<ARTCategoryEntity[]> {
    const results = await ArtCategory.findAll({})
    return results
  }

  async findById (id: string): Promise<ARTCategoryEntity | null> {
    const results = await ArtCategory.findOne({
      where: {
        id
      }
    })

    return results
  }
}
