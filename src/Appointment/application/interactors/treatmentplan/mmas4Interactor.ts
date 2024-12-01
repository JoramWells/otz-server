// import { type Patient } from '../../domain/entities/PatientEntity'
import { MMASFourAttributes } from 'otz-types';
import { IMMASFourInteractor } from '../../interfaces/treatmentplan/IMMAS4Interactor';
import { IMMASFourRepository } from '../../interfaces/treatmentplan/IMMAS4Repository';



export class MMASFourInteractor implements IMMASFourInteractor {
  private readonly repository: IMMASFourRepository;

  constructor(repository: IMMASFourRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getMMASFourById(
    id: string
  ): Promise<MMASFourAttributes | null | undefined> {
    return await this.repository.findById(id);
  }

  async getMMASFourByPatientId(
    id: string
  ): Promise<MMASFourAttributes | null | undefined> {
    return await this.repository.findByPatientId(id);
  }

  async createMMASFour(
    patientData: MMASFourAttributes
  ): Promise<MMASFourAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllMMASFour(
    hospitalID: string
  ): Promise<MMASFourAttributes[] | null> {
    return await this.repository.find(hospitalID);
  }

  async getMMASFourByVisitId(
    id: string
  ): Promise<MMASFourAttributes | null | undefined> {
    return await this.repository.findByVisitId(id);
  }
}
