import { ARTPrescriptionInterface } from "otz-types"

export interface IARTPrescriptionRepository {
  create: (data: ARTPrescriptionInterface) => Promise<ARTPrescriptionInterface | null>
  find: (hospitalID: string | undefined) => Promise<ARTPrescriptionInterface[] | null>
  findById: (id: string) => Promise<ARTPrescriptionInterface | null>
  findPrescriptionByCategory: (hospitalID: string | undefined) => Promise<ARTPrescriptionInterface[] | null | undefined>;

}
