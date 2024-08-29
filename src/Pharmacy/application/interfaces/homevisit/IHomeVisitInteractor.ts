import { HomeVisitAttributes } from "otz-types"

export interface IHomeVisitInteractor {
  createHomeVisit: (patientData: HomeVisitAttributes) => Promise<HomeVisitAttributes | null>
  getAllHomeVisits: () => Promise<HomeVisitAttributes[]>
  getHomeVisitById: (id: string) => Promise<HomeVisitAttributes | null>
}
