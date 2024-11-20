import { ARTPrescriptionInterface } from "otz-types"

export interface IARTPrescriptionInteractor {
  createARTPrescription: (data: ARTPrescriptionInterface) => Promise<ARTPrescriptionInterface | null>
  getAllARTPrescriptions: (hospitalID: string) => Promise<ARTPrescriptionInterface[] | null>
  getARTPrescriptionById: (id: string) => Promise<ARTPrescriptionInterface | null>
}
