/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { ARTInterface } from 'otz-types'
import { type IARTRepository } from '../../application/interfaces/art/IARTRepository'
import { ART } from '../../domain/models/art/art.model'
import { ArtCategory } from '../../domain/models/art/artCategory.model'
import { MeasuringUnit } from '../../domain/models/art/measuringUnit.model'

export class ARTRepository implements IARTRepository {
  async create (data: ARTInterface): Promise<ARTInterface> {
    const results: ARTInterface = await ART.create(data)

    return results
  }

  async find (): Promise<ARTInterface[]> {
    const results = await ART.findAll({
      include: [
        {
          model: ArtCategory,
          attributes: ['id', 'artCategoryDescription', 'artPhase']
        },
        {
          model: MeasuringUnit,
          attributes: ['description']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<ARTInterface | null> {
    const results = await ART.findOne({
      where: {
        id
      }
    })

    return results
  }
}
