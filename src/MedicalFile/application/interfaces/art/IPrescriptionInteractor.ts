import { type PrescriptionEntity } from '../../../domain/entities/art/PrescriptionEntity'

export interface IPrescriptionInteractor {
  createPrescription: (data: PrescriptionEntity) => Promise<PrescriptionEntity | null>
  getAllPrescriptions: () => Promise<PrescriptionEntity[]>
  getPrescriptionById: (id: string) => Promise<PrescriptionEntity | null>
}
