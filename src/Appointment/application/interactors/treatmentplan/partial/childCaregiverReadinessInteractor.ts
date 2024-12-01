// import { type Patient } from '../../domain/entities/PatientEntity'
import { ChildCaregiverReadinessAttributes } from 'otz-types';
import { IChildCaregiverReadinessInteractor } from '../../../interfaces/disclosure/partial/IChildCaregiverReadinessInteractor';
import { IChildCaregiverRepository } from '../../../interfaces/disclosure/partial/IChildCaregiverRepository';


export class ChildCaregiverReadinessInteractor
  implements IChildCaregiverReadinessInteractor
{
  private readonly repository: IChildCaregiverRepository;

  constructor(repository: IChildCaregiverRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllChildCaregiverReadiness(
    hospitalID: string
  ): Promise<ChildCaregiverReadinessAttributes[] | null> {
    return await this.repository.find(hospitalID);
  }

  async getChildCaregiverReadinessById(
    id: string
  ): Promise<ChildCaregiverReadinessAttributes | null | undefined> {
    return await this.repository.findById(id);
  }

  async getChildCaregiverReadinessByPatientId(
    patientID: string
  ): Promise<ChildCaregiverReadinessAttributes | null | undefined> {
    return await this.repository.findByPatientId(patientID);
  }

  async createChildCaregiverReadiness(
    patientData: ChildCaregiverReadinessAttributes
  ): Promise<ChildCaregiverReadinessAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllChildCaregiverReadinessByVisitId(): Promise<
    ChildCaregiverReadinessAttributes[]
  > {
    return await this.repository.find();
  }

  //
  async getChildCaregiverReadinessByVisitId(
    id: string
  ): Promise<ChildCaregiverReadinessAttributes | null | undefined> {
    return await this.repository.findByVisitId(id);
  }
}
