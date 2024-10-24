import { AppointmentAttributes, PrescriptionInterface } from 'otz-types'
import { type IPrescriptionInteractor } from '../interfaces/art/IPrescriptionInteractor'
import { type IPrescriptionRepository } from '../interfaces/art/IPrescriptionRepository'

export class PrescriptionInteractor implements IPrescriptionInteractor {
  private readonly repository: IPrescriptionRepository;

  constructor(repository: IPrescriptionRepository) {
    this.repository = repository;
  }

  async getFacilityAdherence(): Promise<string | number> {
    return await this.repository.findFacilityAdherence();
  }

  async getPrescriptionById(id: string): Promise<PrescriptionInterface | null> {
    return await this.repository.findById(id);
  }

  async getAllPrescriptionByPatientId(
    id: string
  ): Promise<PrescriptionInterface[] | null> {
    return await this.repository.findAllByPatientId(id);
  }

  async getPrescriptionDetails(
    id: string
  ): Promise<PrescriptionInterface | null> {
    return await this.repository.findDetails(id);
  }

  async createPrescription(
    data: PrescriptionInterface,
    appointmentInput: AppointmentAttributes
  ): Promise<PrescriptionInterface | null> {
    return await this.repository.create(data, appointmentInput);
  }

  async editPrescription(
    data: PrescriptionInterface
  ): Promise<PrescriptionInterface | null> {
    return await this.repository.edit(data);
  }

  async getAllPrescriptions(dateQuery: string): Promise<PrescriptionInterface[]> {
    return await this.repository.find(dateQuery);
  }

  async getAllAdherence(): Promise<PrescriptionInterface[]> {
    return await this.repository.findAllAdherence();
  }

  async findRecentRecentByPatientID(id: string) {
    return await this.repository.getRecentPrescriptionByPatientID(id)
  }
}
