import { ARTPrescriptionInterface } from "otz-types"

export interface IARTPrescriptionRepository {
  create: (data: ARTPrescriptionInterface) => Promise<ARTPrescriptionInterface | null>
  find: () => Promise<ARTPrescriptionInterface[]>
  findById: (id: string) => Promise<ARTPrescriptionInterface | null>
}
