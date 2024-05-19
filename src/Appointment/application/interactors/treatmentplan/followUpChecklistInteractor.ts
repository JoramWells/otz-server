// import { type Patient } from '../../domain/entities/PatientEntity'
import { FollowUpChecklistEntity } from '../../../domain/entities/treatmentplan/FollowUpChecklistEntity';
import { IFollowUpChecklistInteractor } from '../../interfaces/treatmentplan/IFollowUpChecklistInteractor';
import { IFollowUpChecklistRepository } from '../../interfaces/treatmentplan/IFollowUpChecklistRepository';


export class FollowUpChecklistInteractor implements IFollowUpChecklistInteractor {
  private readonly repository: IFollowUpChecklistRepository;

  constructor(repository: IFollowUpChecklistRepository) {
    this.repository = repository;
  }
  
  async getFollowUpChecklistById(id: string): Promise<FollowUpChecklistEntity | null> {
    return await this.repository.findById(id);
  }

  async createFollowUpChecklist(patientData: FollowUpChecklistEntity): Promise<FollowUpChecklistEntity> {
    return await this.repository.create(patientData);
  }

  async getAllFollowUpChecklist(): Promise<FollowUpChecklistEntity[]> {
    return await this.repository.find();
  }
}
