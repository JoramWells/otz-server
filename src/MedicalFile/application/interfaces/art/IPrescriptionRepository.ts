import { type PrescriptionEntity } from '../../../domain/entities/art/PrescriptionEntity'

export interface IPrescriptionRepository {
  create: (data: PrescriptionEntity) => Promise<PrescriptionEntity | null>
  find: () => Promise<PrescriptionEntity[]>
  findById: (id: string) => Promise<PrescriptionEntity | null>
}
