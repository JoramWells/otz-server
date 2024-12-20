import { AppointmentAttributes, HomeVisitConfigAttributes, PaginatedResponseInterface } from "otz-types"
import { IHomeVisitConfigInteractor } from "../../interfaces/homevisit/IHomeVisitConfigInteractor"
import { IHomeVisitConfigRepository } from "../../interfaces/homevisit/IHomeVisitConfigRepository"

export class HomeVisitConfigInteractor implements IHomeVisitConfigInteractor {
  private readonly repository: IHomeVisitConfigRepository;

  constructor(repository: IHomeVisitConfigRepository) {
    this.repository = repository;
  }

  async getHomeVisitConfigById(
    id: string
  ): Promise<HomeVisitConfigAttributes | null> {
    return await this.repository.findById(id);
  }

  async createHomeVisitConfig(
    data: HomeVisitConfigAttributes
  ): Promise<HomeVisitConfigAttributes | null> {
    return await this.repository.create(data);
  }

  async getAllHomeVisitConfig(
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string
  ): Promise<PaginatedResponseInterface<HomeVisitConfigAttributes> | undefined | null> {
    return await this.repository.find(hospitalID, page, pageSize, searchQuery);
  }
}
