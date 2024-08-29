import { HomeVisitAttributes } from "otz-types"

export interface IHomeVisitRepository {
  create: (data: HomeVisitAttributes) => Promise<HomeVisitAttributes | null>
  find: () => Promise<HomeVisitAttributes[]>
  findById: (id: string) => Promise<HomeVisitAttributes | null>
}
