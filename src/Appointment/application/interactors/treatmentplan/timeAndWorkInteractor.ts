import { TimeAndWorkEntity } from '../../../domain/entities/treatmentplan/TimeAndWorkEntity';
import { ITimeAndWorkInteractor } from '../../interfaces/treatmentplan/ITimeAndWorkInteractor';
import { ITimeAndWorkRepository } from '../../interfaces/treatmentplan/ITimeAndWorkRepository';


export class TimeAndWorkInteractor implements ITimeAndWorkInteractor {
  private readonly repository: ITimeAndWorkRepository;

  constructor(repository: ITimeAndWorkRepository) {
    this.repository = repository;
  }

  async getTimeAndWorkById(id: string): Promise<TimeAndWorkEntity | null> {
    return await this.repository.findById(id);
  }

   async getTimeAndWorkByPatientId(id: string): Promise<TimeAndWorkEntity | null> {
    return await this.repository.findByPatientId(id);
  }

  async updateMorningSchedule(id: string, data: TimeAndWorkEntity): Promise<TimeAndWorkEntity | null> {
    return await this.repository.updateMorningSchedule(id, data);
  }

  async updateEveningSchedule(id: string, data:TimeAndWorkEntity): Promise<TimeAndWorkEntity | null> {
    return await this.repository.updateEveningSchedule(id, data);
  }

  async createTimeAndWork(
    patientData: TimeAndWorkEntity
  ): Promise<TimeAndWorkEntity> {
    return await this.repository.create(patientData);
  }

  async getAllTimeAndWork(): Promise<TimeAndWorkEntity[]> {
    return await this.repository.find();
  }
}
