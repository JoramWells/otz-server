import { AppointmentAttributes, HomeVisitAttributes } from "otz-types"
import { IHomeVisitRepository } from "../../interfaces/homevisit/IHomeVisitRepository"
import { IHomeVisitInteractor } from "../../interfaces/homevisit/IHomeVisitInteractor"


export class HomeVisitInteractor implements IHomeVisitInteractor {
  private readonly repository: IHomeVisitRepository

  constructor (repository: IHomeVisitRepository) {
    this.repository = repository
  }
  async getAllHomeVisitById (id: string): Promise<HomeVisitAttributes[] | null>{
    return await this.repository.findAllById(id)
  }

  async getHomeVisitById (id: string): Promise<HomeVisitAttributes | null> {
    return await this.repository.findById(id)
  }

  async createHomeVisit (
    data: HomeVisitAttributes,
    appointmentInput: AppointmentAttributes
  ): Promise<HomeVisitAttributes | null> {
    return await this.repository.create(data, appointmentInput)
  }

  async getAllHomeVisits (): Promise<HomeVisitAttributes[]> {
    return await this.repository.find()
  }
}
