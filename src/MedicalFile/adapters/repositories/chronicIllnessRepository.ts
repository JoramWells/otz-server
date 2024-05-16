/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IChronicIllnessRepository } from '../../application/interfaces/IChronicIllnessRepository'
import { type ChronicIllnessEntity } from '../../domain/entities/ChronicIllnessEntity'
import { ChronicIllness } from '../../domain/models/chronicIllness.model'

export class ChronicIllnessRepository implements IChronicIllnessRepository {
  async create (data: ChronicIllnessEntity): Promise<ChronicIllnessEntity | null> {
    const results: ChronicIllnessEntity = await ChronicIllness.create(data)

    return results
  }

  async find (): Promise<ChronicIllnessEntity[]> {
    const results = await ChronicIllness.findAll({})
    return results
  }

  async findById (id: string): Promise<ChronicIllnessEntity | null> {
    const results = await ChronicIllness.findOne({
      where: {
        patientID: id
      }

    })

    return results
  }
}
