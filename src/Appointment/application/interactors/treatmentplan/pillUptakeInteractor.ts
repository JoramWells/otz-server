// import { type Patient } from '../../domain/entities/PatientEntity'
import { UptakeAttributes } from 'otz-types';
import { IPillUptakeInteractor } from '../../interfaces/treatmentplan/IPillUptakeInteractor';
import { IPillUptakeRepository } from '../../interfaces/treatmentplan/IPillUptakeRepository';


export class PillUptakeInteractor implements IPillUptakeInteractor {
  private readonly repository: IPillUptakeRepository;

  constructor(repository: IPillUptakeRepository) {
    this.repository = repository;
  }
  async getDailyPillUptakeCount() {
    return await this.repository.count();
  }

  async getPillUptakeById(id: string): Promise<UptakeAttributes | null> {
    return await this.repository.findById(id);
  }

  async editPillUptake(id: string, status: boolean, queryString: string): Promise<UptakeAttributes | null> {
    return await this.repository.edit(id, status, queryString);
  }

  async createPillUptake(patientData: UptakeAttributes): Promise<UptakeAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllPillUptakes(): Promise<UptakeAttributes[]> {
    return await this.repository.find();
  }
}
