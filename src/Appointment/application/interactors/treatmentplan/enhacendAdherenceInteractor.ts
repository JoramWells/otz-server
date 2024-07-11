import { EnhancedAdherenceAttributes } from "otz-types";
import { IEnhancedAdherenceInteractor } from "../../interfaces/treatmentplan/IEnhancedAdherenceInteractor";
import { IEnhancedAdherenceRepository } from "../../interfaces/treatmentplan/IEnhancedAdherenceRepository";


export class EnhancedAdherenceInteractor implements IEnhancedAdherenceInteractor {
  private readonly repository: IEnhancedAdherenceRepository;

  constructor(repository: IEnhancedAdherenceRepository) {
    this.repository = repository;
  }
  
  async getEnhancedAdherenceById(id: string): Promise<EnhancedAdherenceAttributes | null> {
    return await this.repository.findById(id);
  }

  async createEnhancedAdherence(patientData: EnhancedAdherenceAttributes): Promise<EnhancedAdherenceAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllEnhancedAdherence(): Promise<EnhancedAdherenceAttributes[]> {
    return await this.repository.find();
  }
}
