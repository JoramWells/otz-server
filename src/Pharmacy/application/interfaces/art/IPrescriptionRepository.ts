import { type AppointmentEntity } from '../../../domain/entities/appointment/AppointmentEntity'
import { type PrescriptionEntity } from '../../../domain/entities/art/PrescriptionEntity'

export interface IPrescriptionRepository {
  create: (data: PrescriptionEntity, appointmentInput: AppointmentEntity) => Promise<PrescriptionEntity | null>
  find: () => Promise<PrescriptionEntity[]>
  findById: (id: string) => Promise<PrescriptionEntity | null>
  findDetails: (id: string) => Promise<PrescriptionEntity | null>
  findAllAdherence: () => Promise<PrescriptionEntity[]>

}
