import { type AppointmentEntity } from '../../../domain/entities/appointment/AppointmentEntity'
import { type PrescriptionEntity } from '../../../domain/entities/art/PrescriptionEntity'

export interface IPrescriptionInteractor {
  createPrescription: (data: PrescriptionEntity, appointmentInput: AppointmentEntity) => Promise<PrescriptionEntity | null>
  getAllPrescriptions: () => Promise<PrescriptionEntity[]>
  getPrescriptionById: (id: string) => Promise<PrescriptionEntity | null>
}
