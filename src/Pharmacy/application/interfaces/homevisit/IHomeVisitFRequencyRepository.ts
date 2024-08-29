import { HomeVisitFrequencyAttributes } from "otz-types"

export interface IHomeVisitFrequencyRepository {
  create: (data: HomeVisitFrequencyAttributes) => Promise<HomeVisitFrequencyAttributes | null>
  find: () => Promise<HomeVisitFrequencyAttributes[]>
  findById: (id: string) => Promise<HomeVisitFrequencyAttributes | null>
}
