// import { type Patient } from '../../domain/entities/PatientEntity'
import { DisclosureChecklistEntity } from '../../../domain/entities/treatmentplan/DisclosureChecklistEntity';
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

  async getAllDisclosureChecklistByVisitId(id: string): Promise<DisclosureChecklistEntity[] | null> {
    return await this.repository.findAllByVisitId(id);
  }

  async getDisclosureChecklistById(id: string): Promise<DisclosureChecklistEntity | null> {
    return await this.repository.findById(id);
  }

  async createDisclosureChecklist(patientData: DisclosureChecklistEntity): Promise<DisclosureChecklistEntity> {
    return await this.repository.create(patientData);
  }

  async getAllDisclosureChecklist(): Promise<DisclosureChecklistEntity[]> {
    return await this.repository.find();
  }
}
