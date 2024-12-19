import {
  AppointmentAttributes,
  HomeVisitAttributes,
  PaginatedResponseInterface,
} from "otz-types";
import { IHomeVisitRepository } from "../../interfaces/homevisit/IHomeVisitRepository";
import { IHomeVisitInteractor } from "../../interfaces/homevisit/IHomeVisitInteractor";

export class HomeVisitInteractor implements IHomeVisitInteractor {
  private readonly repository: IHomeVisitRepository;

  constructor(repository: IHomeVisitRepository) {
    this.repository = repository;
  }
  async getAllHomeVisitById(id: string): Promise<HomeVisitAttributes[] | null> {
    return await this.repository.findAllById(id);
  }

  async getHomeVisitById(id: string): Promise<HomeVisitAttributes | null> {
    return await this.repository.findById(id);
  }

  async createHomeVisit(
    data: HomeVisitAttributes,
    appointmentInput: AppointmentAttributes
  ): Promise<HomeVisitAttributes | null> {
    return await this.repository.create(data, appointmentInput);
  }

  async getAllHomeVisits(
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery?: string
  ): Promise<
    PaginatedResponseInterface<HomeVisitAttributes> | undefined | null
  > {
    return await this.repository.find(hospitalID, page, pageSize, searchQuery);
  }
}
