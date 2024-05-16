import { type ARTPrescriptionEntity } from '../../../domain/entities/art/ARTPrescriptionEntity'

export interface IARTPrescriptionInteractor {
  createARTPrescription: (data: ARTPrescriptionEntity) => Promise<ARTPrescriptionEntity | null>
  getAllARTPrescriptions: () => Promise<ARTPrescriptionEntity[]>
  getARTPrescriptionById: (id: string) => Promise<ARTPrescriptionEntity | null>
}
