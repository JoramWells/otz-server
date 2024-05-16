/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IARTSwitchReasonRepository } from '../../application/interfaces/art/IARTSwitchReasonRepository'
import { type ARTSwitchReasonsEntity } from '../../domain/entities/art/ARTSwitchReasonsEntity'
import { ARTSwitchReason } from '../../domain/models/art/artSwitchReasons.model'

export class ARTSwitchReasonRepository implements IARTSwitchReasonRepository {
  async create (data: ARTSwitchReasonsEntity): Promise<ARTSwitchReasonsEntity> {
    const results = await ARTSwitchReason.create(data)

    return results
  }

  async find (): Promise<ARTSwitchReasonsEntity[]> {
    const results = await ARTSwitchReason.findAll({})
    return results
  }

  async findById (id: string): Promise<ARTSwitchReasonsEntity | null> {
    const results = await ARTSwitchReason.findOne({
      where: {
        id
      }
    })

    return results
  }
}
