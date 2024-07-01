import { ARTSwitchReasonInterface } from "otz-types"

export interface IARTSwitchReasonRepository {
  create: (data: ARTSwitchReasonInterface) => Promise<ARTSwitchReasonInterface | null>
  find: () => Promise<ARTSwitchReasonInterface[]>
  findById: (id: string) => Promise<ARTSwitchReasonInterface | null>
}
