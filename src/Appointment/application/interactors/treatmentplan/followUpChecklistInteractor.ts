// import { type Patient } from '../../domain/entities/PatientEntity'
import { FollowUpChecklistAttributes } from 'otz-types';
import { IFollowUpChecklistInteractor } from '../../interfaces/treatmentplan/IFollowUpChecklistInteractor';
import { IFollowUpChecklistRepository } from '../../interfaces/treatmentplan/IFollowUpChecklistRepository';


export class FollowUpChecklistInteractor implements IFollowUpChecklistInteractor {
  private readonly repository: IFollowUpChecklistRepository;

  constructor(repository: IFollowUpChecklistRepository) {
    this.repository = repository;
  }

  async getFollowUpChecklistById(
    id: string
  ): Promise<FollowUpChecklistAttributes | null> {
    return await this.repository.findById(id);
  }

  async createFollowUpChecklist(
    patientData: FollowUpChecklistAttributes
  ): Promise<FollowUpChecklistAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllFollowUpChecklist(
    hospitalID: string
  ): Promise<FollowUpChecklistAttributes[] | null> {
    return await this.repository.find(hospitalID);
  }
}
