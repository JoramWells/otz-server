import { ARTPrescriptionInterface } from "otz-types"

export interface IARTPrescriptionInteractor {
  createARTPrescription: (data: ARTPrescriptionInterface) => Promise<ARTPrescriptionInterface | null>
  getAllARTPrescriptions: () => Promise<ARTPrescriptionInterface[]>
  getARTPrescriptionById: (id: string) => Promise<ARTPrescriptionInterface | null>
}
