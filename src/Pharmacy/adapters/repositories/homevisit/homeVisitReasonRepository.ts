import { HomeVisitReasonAttributes } from "otz-types"
import { IHomeVisitReasonRepository } from "../../../application/interfaces/homevisit/IHomeVisiReasontRepository"
import { HomeVisitReason } from "../../../domain/models/homevisit/homeVisitReason.model"

export class HomeVisitReasonRepository implements IHomeVisitReasonRepository {
  async create (data: HomeVisitReasonAttributes): Promise<HomeVisitReasonAttributes> {
    const results: HomeVisitReasonAttributes = await HomeVisitReason.create(data)

    return results
  }

  async find (): Promise<HomeVisitReasonAttributes[]> {
    const results = await HomeVisitReason.findAll()
    return results
  }

  async findById (id: string): Promise<HomeVisitReasonAttributes | null> {
    const results = await HomeVisitReason.findOne({
      where: {
        id
      }
    })

    return results
  }
}
