import { type AppointmentEntity } from '../../domain/entities/appointment/AppointmentEntity'
import { type PrescriptionEntity } from '../../domain/entities/art/PrescriptionEntity'
import { type IPrescriptionInteractor } from '../interfaces/art/IPrescriptionInteractor'
import { type IPrescriptionRepository } from '../interfaces/art/IPrescriptionRepository'

export class PrescriptionInteractor implements IPrescriptionInteractor {
  private readonly repository: IPrescriptionRepository

  constructor (repository: IPrescriptionRepository) {
    this.repository = repository
  }

  async getPrescriptionById (id: string): Promise<PrescriptionEntity | null> {
    return await this.repository.findById(id)
  }

  async createPrescription (data: PrescriptionEntity, appointmentInput: AppointmentEntity): Promise<PrescriptionEntity | null> {
    return await this.repository.create(data, appointmentInput)
  }

  async getAllPrescriptions (): Promise<PrescriptionEntity[]> {
    return await this.repository.find()
  }
}
