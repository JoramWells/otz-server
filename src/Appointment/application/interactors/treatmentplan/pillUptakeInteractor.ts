// import { type Patient } from '../../domain/entities/PatientEntity'
import { UptakeEntity } from '../../../domain/entities/treatmentplan/UptakeEntity';
import { IPillUptakeInteractor } from '../../interfaces/treatmentplan/IPillUptakeInteractor';
import { IPillUptakeRepository } from '../../interfaces/treatmentplan/IPillUptakeRepository';


export class PillUptakeInteractor implements IPillUptakeInteractor {
  private readonly repository: IPillUptakeRepository;

  constructor(repository: IPillUptakeRepository) {
    this.repository = repository;
  }
  async getDailyPillUptakeCount(){
    return await this.repository.count()
  };

  async getPillUptakeById(id: string): Promise<UptakeEntity | null> {
    return await this.repository.findById(id);
  }

  async createPillUptake(patientData: UptakeEntity): Promise<UptakeEntity> {
    return await this.repository.create(patientData);
  }

  async getAllPillUptakes(): Promise<UptakeEntity[]> {
    return await this.repository.find();
  }
}
