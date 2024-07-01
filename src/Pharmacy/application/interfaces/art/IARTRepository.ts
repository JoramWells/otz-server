import { ARTInterface } from "otz-types"

export interface IARTRepository {
  create: (data: ARTInterface) => Promise<ARTInterface | null>
  find: () => Promise<ARTInterface[]>
  findById: (id: string) => Promise<ARTInterface | null>
}
