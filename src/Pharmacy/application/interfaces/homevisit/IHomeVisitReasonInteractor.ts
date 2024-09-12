import { HomeVisitReasonAttributes } from "otz-types"

export interface IHomeVisitReasonInteractor {
  createHomeVisitReason: (patientData: HomeVisitReasonAttributes) => Promise<HomeVisitReasonAttributes | null>
  getAllHomeVisitReasons: () => Promise<HomeVisitReasonAttributes[]>
  getHomeVisitReasonById: (id: string) => Promise<HomeVisitReasonAttributes | null>
}
