// import { type Patient } from '../../domain/entities/PatientEntity'
import { MMASFourEntity } from '../../../domain/entities/treatmentplan/MMASFourEntity';
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

  async getMMASFourById(id: string): Promise<MMASFourEntity | null> {
    return await this.repository.findById(id);
  }

  async createMMASFour(patientData: MMASFourEntity): Promise<MMASFourEntity> {
    return await this.repository.create(patientData);
  }

  async getAllMMASFour(): Promise<MMASFourEntity[]> {
    return await this.repository.find();
  }
}
