import { HomeVisitAttributes } from "otz-types"
import { IHomeVisitRepository } from "../../interfaces/homevisit/IHomeVisitRepository"
import { IHomeVisitInteractor } from "../../interfaces/homevisit/IHomeVisitInteractor"


export class HomeVisitInteractor implements IHomeVisitInteractor {
  private readonly repository: IHomeVisitRepository

  constructor (repository: IHomeVisitRepository) {
    this.repository = repository
  }

  async getHomeVisitById (id: string): Promise<HomeVisitAttributes | null> {
    return await this.repository.findById(id)
  }

  async createHomeVisit (
    data: HomeVisitAttributes
  ): Promise<HomeVisitAttributes | null> {
    return await this.repository.create(data)
  }

  async getAllHomeVisits (): Promise<HomeVisitAttributes[]> {
    return await this.repository.find()
  }
}
