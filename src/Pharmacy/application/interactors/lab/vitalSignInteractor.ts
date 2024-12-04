// import { type Patient } from '../../domain/entities/PatientEntity'
import { VitalSignsInterface } from 'otz-types'
import { IVitalSignsRepository } from '../../interfaces/lab/IVitalSignsRepository';
import { IVitalSignsInteractor } from '../../interfaces/lab/IVitalSignsInteractor';
import { VitalSignResponseInterface } from '../../../entities/VitalSignResponseInterface';

export class VitalSignsInteractor implements IVitalSignsInteractor {
  private readonly repository: IVitalSignsRepository;

  constructor(repository: IVitalSignsRepository) {
    this.repository = repository;
  }

  async getVitalSignsById(
    id: string
  ): Promise<VitalSignsInterface | null | undefined> {
    return await this.repository.findById(id);
  }

  async createVitalSigns(
    data: VitalSignsInterface
  ): Promise<VitalSignsInterface | null | undefined> {
    return await this.repository.create(data);
  }

  async getAllVitalSigns(
    hospitalID: string
  ): Promise<VitalSignResponseInterface | undefined | null> {
    return await this.repository.find(hospitalID);
  }

  //
  async getVitalSignsByVisitId(
    id: string
  ): Promise<VitalSignsInterface | null | undefined> {
    return await this.repository.findByVisitId(id);
  }

  //
  async getVitalSignsByPatientId(
    id: string
  ): Promise<VitalSignsInterface | null | undefined> {
    return await this.repository.findByPatientId(id);
  }
}
