// import { type Patient } from '../../domain/entities/PatientEntity'
import { MMASEntity } from '../../../domain/entities/treatmentplan/MMASEntity';
import { IMMASInteractor } from '../../interfaces/treatmentplan/IMMASInteractor';
import { IMMASRepository } from '../../interfaces/treatmentplan/IMMASRepository';


export class MMASInteractor implements IMMASInteractor {
  private readonly repository: IMMASRepository;

  constructor(repository: IMMASRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getMMASById(id: string): Promise<MMASEntity | null> {
    return await this.repository.findById(id);
  }

  async createMMAS(patientData: MMASEntity): Promise<MMASEntity> {
    return await this.repository.create(patientData);
  }

  async getAllMMAS(): Promise<MMASEntity[]> {
    return await this.repository.find();
  }
}
