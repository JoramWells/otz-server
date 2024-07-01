/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { MeasuringUnitInterface } from 'otz-types'
import { type IMeasuringUnitRepository } from '../../application/interfaces/art/IMeasuringUnitRepository'
import { MeasuringUnit } from '../../domain/models/art/measuringUnit.model'

export class MeasuringUnitRepository implements IMeasuringUnitRepository {
  async create (data: MeasuringUnitInterface): Promise<MeasuringUnitInterface> {
    const results: MeasuringUnitInterface = await MeasuringUnit.create(data)

    return results
  }

  async find (): Promise<MeasuringUnitInterface[]> {
    const results = await MeasuringUnit.findAll({})
    return results
  }

  async findById (id: string): Promise<MeasuringUnitInterface | null> {
    const results = await MeasuringUnit.findOne({
      where: {
        id
      }
    })

    return results
  }
}
