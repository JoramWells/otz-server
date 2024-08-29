import { HomeVisitFrequencyAttributes } from "otz-types"

export interface IHomeVisitFrequencyInteractor {
  createHomeVisitFrequency: (patientData: HomeVisitFrequencyAttributes) => Promise<HomeVisitFrequencyAttributes | null>
  getAllHomeVisitFrequencies: () => Promise<HomeVisitFrequencyAttributes[]>
  getHomeVisitFrequencyById: (id: string) => Promise<HomeVisitFrequencyAttributes | null>
}
