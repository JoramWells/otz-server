/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { ARTSwitchReasonInterface } from 'otz-types'
import { type IARTSwitchReasonRepository } from '../../application/interfaces/art/IARTSwitchReasonRepository'
import { ARTSwitchReason } from '../../domain/models/art/artSwitchReasons.model'

export class ARTSwitchReasonRepository implements IARTSwitchReasonRepository {
  async create (data: ARTSwitchReasonInterface): Promise<ARTSwitchReasonInterface> {
    const results = await ARTSwitchReason.create(data)

    return results
  }

  async find (): Promise<ARTSwitchReasonInterface[]> {
    const results = await ARTSwitchReason.findAll({})
    return results
  }

  async findById (id: string): Promise<ARTSwitchReasonInterface | null> {
    const results = await ARTSwitchReason.findOne({
      where: {
        id
      }
    })

    return results
  }
}
