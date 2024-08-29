import { HomeVisitFrequencyAttributes } from "otz-types";
import { IHomeVisitFrequencyInteractor } from "../../interfaces/homevisit/IHomeVisitFrequencyInteractor";
import { IHomeVisitFrequencyRepository } from "../../interfaces/homevisit/IHomeVisitFRequencyRepository";

export class HomeVisitReasonInteractor implements IHomeVisitFrequencyInteractor {
  private readonly repository: IHomeVisitFrequencyRepository;

  constructor(repository: IHomeVisitFrequencyRepository) {
    this.repository = repository;
  }

  async getHomeVisitFrequencyById(
    id: string
  ): Promise<HomeVisitFrequencyAttributes | null> {
    return await this.repository.findById(id);
  }

  async createHomeVisitFrequency(
    patientData: HomeVisitFrequencyAttributes
  ): Promise<HomeVisitFrequencyAttributes | null> {
    return await this.repository.create(patientData);
  }

  async getAllHomeVisitFrequencies(): Promise<HomeVisitFrequencyAttributes[]> {
    return await this.repository.find();
  }
}
