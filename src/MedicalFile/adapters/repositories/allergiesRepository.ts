/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IAllergiesRepository } from '../../application/interfaces/IAllergiesRepository'
import { type AllergiesEntity } from '../../domain/entities/AllergiesEntity'
import { Allergies } from '../../domain/models/allergies.model'

export class AllergiesRepository implements IAllergiesRepository {
  async create (data: AllergiesEntity): Promise<AllergiesEntity> {
    const results: AllergiesEntity = await Allergies.create(data)

    return results
  }

  async find (): Promise<AllergiesEntity[]> {
    const results = await Allergies.findAll({})
    return results
  }

  async findById (id: string): Promise<AllergiesEntity | null> {
    const results = await Allergies.findOne({
      where: {
        id
      }
    })

    return results
  }
}
