/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IARTRepository } from '../../application/interfaces/art/IARTRepository'
import { type ARTEntity } from '../../domain/entities/art/ARTEntity'
import { ART } from '../../domain/models/art/art.model'
import { ArtCategory } from '../../domain/models/art/artCategory.model'
import { MeasuringUnit } from '../../domain/models/art/measuringUnit.model'

export class ARTRepository implements IARTRepository {
  async create (data: ARTEntity): Promise<ARTEntity> {
    const results: ARTEntity = await ART.create(data)

    return results
  }

  async find (): Promise<ARTEntity[]> {
    const results = await ART.findAll({
      include: [
        {
          model: ArtCategory,
          attributes: ['id', 'artCategoryDescription']
        },
        {
          model: MeasuringUnit,
          attributes: ['description']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<ARTEntity | null> {
    const results = await ART.findOne({
      where: {
        id
      }
    })

    return results
  }
}
