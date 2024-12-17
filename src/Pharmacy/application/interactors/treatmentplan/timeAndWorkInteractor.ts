import { TimeAndWorkAttributes } from "otz-types";
import { ITimeAndWorkRepository } from "../../interfaces/treatmentplan/ITimeAndWorkRepository";
import { ITimeAndWorkInteractor } from "../../interfaces/treatmentplan/ITimeAndWorkInteractor";
import { TimeAndWorkResponseInterface } from "../../../entities/TimeAndWorkResponseInterface";

export class TimeAndWorkInteractor implements ITimeAndWorkInteractor {
  private readonly repository: ITimeAndWorkRepository;

  constructor(repository: ITimeAndWorkRepository) {
    this.repository = repository;
  }

  async getTimeAndWorkById(
    id: string
  ): Promise<TimeAndWorkAttributes | null | undefined> {
    return await this.repository.findById(id);
  }

  async getTimeAndWorkByPatientId(
    id: string
  ): Promise<TimeAndWorkAttributes | null> {
    return await this.repository.findByPatientId(id);
  }

  async getTimeAndWorkByVisitId(
    id: string
  ): Promise<TimeAndWorkAttributes | null | undefined> {
    return await this.repository.findByVisitId(id);
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

  async getAllTimeAndWork(
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ): Promise<TimeAndWorkResponseInterface | undefined | null> {
    return await this.repository.find(hospitalID, page, pageSize, searchQuery);
  }

  //
  async getRecentTimeAndWork(
    id?: string
  ): Promise<TimeAndWorkAttributes[] | null | undefined> {
    return await this.repository.findRecent(id);
  }
}
