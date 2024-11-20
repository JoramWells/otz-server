import { ARTPrescriptionInterface } from "otz-types"

export interface IARTPrescriptionRepository {
  create: (data: ARTPrescriptionInterface) => Promise<ARTPrescriptionInterface | null>
  find: (hospitalID: string) => Promise<ARTPrescriptionInterface[] | null>
  findById: (id: string) => Promise<ARTPrescriptionInterface | null>
}
