import { ARTSwitchReasonInterface } from "otz-types"

export interface IARTSwitchReasonInteractor {
  createARTSwitchReasons: (data: ARTSwitchReasonInterface) => Promise<ARTSwitchReasonInterface | null>
  getAllARTSwitchReasons: () => Promise<ARTSwitchReasonInterface[]>
  getARTSwitchReasonsById: (id: string) => Promise<ARTSwitchReasonInterface | null>
}
