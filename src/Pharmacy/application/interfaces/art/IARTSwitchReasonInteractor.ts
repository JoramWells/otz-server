import { type ARTSwitchReasonsEntity } from '../../../domain/entities/art/ARTSwitchReasonsEntity'

export interface IARTSwitchReasonInteractor {
  createARTSwitchReasons: (data: ARTSwitchReasonsEntity) => Promise<ARTSwitchReasonsEntity | null>
  getAllARTSwitchReasons: () => Promise<ARTSwitchReasonsEntity[]>
  getARTSwitchReasonsById: (id: string) => Promise<ARTSwitchReasonsEntity | null>
}
