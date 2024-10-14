import { TimeAndWorkAttributes } from 'otz-types';
import { ITimeAndWorkRepository } from '../../interfaces/treatmentplan/ITimeAndWorkRepository';
import { ITimeAndWorkInteractor } from '../../interfaces/treatmentplan/ITimeAndWorkInteractor';


export class TimeAndWorkInteractor implements ITimeAndWorkInteractor {
  private readonly repository: ITimeAndWorkRepository;

  constructor(repository: ITimeAndWorkRepository) {
    this.repository = repository;
  }

  async getTimeAndWorkById(id: string): Promise<TimeAndWorkAttributes | null> {
    return await this.repository.findById(id);
  }

  async getTimeAndWorkByPatientId(
    id: string
  ): Promise<TimeAndWorkAttributes | null> {
    return await this.repository.findByPatientId(id);
  }

  async updateMorningSchedule(
    id: string,
    data: TimeAndWorkAttributes
  ): Promise<TimeAndWorkAttributes | null> {
    return await this.repository.updateMorningSchedule(id, data);
  }

  async updateEveningSchedule(
    id: string,
    data: TimeAndWorkAttributes
  ): Promise<TimeAndWorkAttributes | null> {
    return await this.repository.updateEveningSchedule(id, data);
  }

  //
  async updateSchedule(
    id: string,
    data: TimeAndWorkAttributes
  ): Promise<TimeAndWorkAttributes | null> {
    return await this.repository.editSchedule(id, data);
  }

  async createTimeAndWork(
    patientData: TimeAndWorkAttributes
  ): Promise<TimeAndWorkAttributes> {
    return await this.repository.create(patientData);
  }

  async deleteTimeAndWork(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }

  async getAllTimeAndWork(): Promise<TimeAndWorkAttributes[]> {
    return await this.repository.find();
  }
}
