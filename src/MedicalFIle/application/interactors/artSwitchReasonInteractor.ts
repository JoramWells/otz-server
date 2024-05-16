import { type ARTSwitchReasonsEntity } from '../../domain/entities/art/ARTSwitchReasonsEntity'
import { type IARTSwitchReasonInteractor } from '../interfaces/art/IARTSwitchReasonInteractor'
import { type IARTSwitchReasonRepository } from '../interfaces/art/IARTSwitchReasonRepository'

export class ARTSwitchReasonInteractor implements IARTSwitchReasonInteractor {
  private readonly repository: IARTSwitchReasonRepository

  constructor (repository: IARTSwitchReasonRepository) {
    this.repository = repository
  }

  async getARTSwitchReasonsById (id: string): Promise<ARTSwitchReasonsEntity | null> {
    return await this.repository.findById(id)
  }

  async createARTSwitchReasons (patientData: ARTSwitchReasonsEntity): Promise<ARTSwitchReasonsEntity | null> {
    return await this.repository.create(patientData)
  }

  async getAllARTSwitchReasons (): Promise<ARTSwitchReasonsEntity[]> {
    return await this.repository.find()
  }
}
