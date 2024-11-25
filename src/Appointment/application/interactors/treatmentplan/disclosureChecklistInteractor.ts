// import { type Patient } from '../../domain/entities/PatientEntity'
import { DisclosureChecklistAttributes } from 'otz-types';
import { IDisclosureChecklistInteractor } from '../../interfaces/treatmentplan/IDisclosureChecklistInteractor';
import { IDisclosureChecklistRepository } from '../../interfaces/treatmentplan/IDisclosureChecklistRepository';


export class DisclosureChecklistInteractor implements IDisclosureChecklistInteractor {
  private readonly repository: IDisclosureChecklistRepository;

  constructor(repository: IDisclosureChecklistRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllDisclosureChecklistByVisitId(
    id: string
  ): Promise<DisclosureChecklistAttributes[] | null> {
    return await this.repository.findAllByVisitId(id);
  }

  async getDisclosureChecklistById(
    id: string
  ): Promise<DisclosureChecklistAttributes | null> {
    return await this.repository.findById(id);
  }

  async createDisclosureChecklist(
    patientData: DisclosureChecklistAttributes
  ): Promise<DisclosureChecklistAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllDisclosureChecklist(
    hospitalID: string
  ): Promise<DisclosureChecklistAttributes[] | null> {
    return await this.repository.find(hospitalID);
  }
}
