import { type IPillUptakeInteractor } from '../interfaces/art/IPillUptakeInteractor'
import { type IPillUptakeRepository } from '../interfaces/art/IPillUptakeRepository'
import { AdherenceAttributes } from "otz-types";
export class PillUptakeInteractor implements IPillUptakeInteractor {
  private readonly repository: IPillUptakeRepository;

  constructor(repository: IPillUptakeRepository) {
    this.repository = repository;
  }

  async getDailyPillUptakeCount(): Promise<AdherenceAttributes | null> {
    return await this.repository.count();
  }

  async getPillUptakeById(id: string): Promise<AdherenceAttributes | null> {
    return await this.repository.findById(id);
  }

  async getCurrentPillUptake(id: string): Promise<AdherenceAttributes | null> {
    return await this.repository.findCurrentPillUptake(id);
  }

  async getPillUptakeByPatientID(
    id: string
  ): Promise<AdherenceAttributes[] | null> {
    return await this.repository.findByPatientID(id);
  }

  async editPillUptake(
    id: string,
    status: boolean,
    queryString: string
  ): Promise<AdherenceAttributes | null> {
    return await this.repository.edit(id, status, queryString);
  }

  async createPillUptake(
    patientData: AdherenceAttributes
  ): Promise<AdherenceAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllPillUptakes(date: Date): Promise<AdherenceAttributes[]> {
    return await this.repository.find(date);
  }

  //
  async deleteUptake(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
