import { HomeVisitFrequencyAttributes } from "otz-types"
import { IHomeVisitFrequencyRepository } from "../../../application/interfaces/homevisit/IHomeVisitFRequencyRepository"
import { HomeVisitFrequency } from "../../../domain/models/homevisit/homeVisitFrequency.model"

export class HomeVisitFrequencyRepository implements IHomeVisitFrequencyRepository {
  async create (data: HomeVisitFrequencyAttributes): Promise<HomeVisitFrequencyAttributes> {
    const results = await HomeVisitFrequency.create(data)

    return results
  }

  async find (): Promise<HomeVisitFrequencyAttributes[]> {
    const results = await HomeVisitFrequency.findAll({})
    return results
  }

  async findById (id: string): Promise<HomeVisitFrequencyAttributes | null> {
    const results = await HomeVisitFrequency.findOne({
      where: {
        id
      }
    })

    return results
  }
}
