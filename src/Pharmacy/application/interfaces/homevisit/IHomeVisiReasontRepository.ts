import { HomeVisitReasonAttributes } from "otz-types"

export interface IHomeVisitReasonRepository {
  create: (data: HomeVisitReasonAttributes) => Promise<HomeVisitReasonAttributes | null>
  find: () => Promise<HomeVisitReasonAttributes[]>
  findById: (id: string) => Promise<HomeVisitReasonAttributes | null>
}
