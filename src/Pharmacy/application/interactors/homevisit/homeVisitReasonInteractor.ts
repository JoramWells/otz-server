import {  HomeVisitReasonAttributes } from "otz-types";
import { IHomeVisitFrequencyRepository } from "../../interfaces/homevisit/IHomeVisitFRequencyRepository";
import { IHomeVisitReasonInteractor } from "../../interfaces/homevisit/IHomeVisitReasonInteractor";

export class HomeVisitReasonInteractor implements IHomeVisitReasonInteractor {
  private readonly repository: IHomeVisitFrequencyRepository;

  constructor(repository: IHomeVisitFrequencyRepository) {
    this.repository = repository;
  }

  async getHomeVisitReasonById(
    id: string
  ): Promise<HomeVisitReasonAttributes | null> {
    return await this.repository.findById(id);
  }

  async createHomeVisitReason(
    patientData: HomeVisitReasonAttributes
  ): Promise<HomeVisitReasonAttributes | null> {
    return await this.repository.create(patientData);
  }

  async getAllHomeVisitReasons(): Promise<HomeVisitReasonAttributes[]> {
    return await this.repository.find();
  }
}
