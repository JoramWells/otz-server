import { ARTInterface } from "otz-types"

export interface IARTInteractor {
  createART: (data: ARTInterface) => Promise<ARTInterface | null>
  getAllARTs: () => Promise<ARTInterface[]>
  getARTById: (id: string) => Promise<ARTInterface | null>
}
