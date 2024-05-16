import { type ARTSwitchReasonsEntity } from '../../../domain/entities/art/ARTSwitchReasonsEntity'

export interface IARTSwitchReasonRepository {
  create: (data: ARTSwitchReasonsEntity) => Promise<ARTSwitchReasonsEntity | null>
  find: () => Promise<ARTSwitchReasonsEntity[]>
  findById: (id: string) => Promise<ARTSwitchReasonsEntity | null>
}
