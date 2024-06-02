// import { type Patient } from '../../domain/entities/PatientEntity'
import { ChildCaregiverReadinessEntity } from '../../../../domain/entities/treatmentplan/disclosure/partial/ChildCaregiverReadinessEntity';
import { IChildCaregiverReadinessInteractor } from '../../../interfaces/disclosure/partial/IChildCaregiverReadinessInteractor';
import { IChildCaregiverRepository } from '../../../interfaces/disclosure/partial/IChildCaregiverRepository';


export class ChildCaregiverReadinessInteractor implements IChildCaregiverReadinessInteractor {
  private readonly repository: IChildCaregiverRepository;

  constructor(repository: IChildCaregiverRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllChildCaregiverReadiness(): Promise<ChildCaregiverReadinessEntity[]> {
    return await this.repository.find()
  }

  async getChildCaregiverReadinessById(id: string): Promise<ChildCaregiverReadinessEntity | null> {
    return await this.repository.findById(id);
  }

  async createChildCaregiverReadiness(patientData: ChildCaregiverReadinessEntity): Promise<ChildCaregiverReadinessEntity> {
    return await this.repository.create(patientData);
  }

  async getAllChildCaregiverReadinessByVisitId(): Promise<ChildCaregiverReadinessEntity[]> {
    return await this.repository.find();
  }
}
