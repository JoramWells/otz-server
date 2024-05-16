import { type ARTPrescriptionEntity } from '../../../domain/entities/art/ARTPrescriptionEntity'

export interface IARTPrescriptionRepository {
  create: (data: ARTPrescriptionEntity) => Promise<ARTPrescriptionEntity | null>
  find: () => Promise<ARTPrescriptionEntity[]>
  findById: (id: string) => Promise<ARTPrescriptionEntity | null>
}
