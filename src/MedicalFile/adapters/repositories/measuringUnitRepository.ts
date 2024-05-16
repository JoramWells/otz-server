/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IMeasuringUnitRepository } from '../../application/interfaces/art/IMeasuringUnitRepository'
import { type MeasuringUnitEntity } from '../../domain/entities/art/MeasuringUnitEntity'
import { MeasuringUnit } from '../../domain/models/art/measuringUnit.model'

export class MeasuringUnitRepository implements IMeasuringUnitRepository {
  async create (data: MeasuringUnitEntity): Promise<MeasuringUnitEntity> {
    const results: MeasuringUnitEntity = await MeasuringUnit.create(data)

    return results
  }

  async find (): Promise<MeasuringUnitEntity[]> {
    const results = await MeasuringUnit.findAll({})
    return results
  }

  async findById (id: string): Promise<MeasuringUnitEntity | null> {
    const results = await MeasuringUnit.findOne({
      where: {
        id
      }
    })

    return results
  }
}
