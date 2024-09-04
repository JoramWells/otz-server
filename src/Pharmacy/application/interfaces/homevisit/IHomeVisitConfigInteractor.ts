import { AppointmentAttributes, HomeVisitConfigAttributes } from "otz-types"

export interface IHomeVisitConfigInteractor {
  createHomeVisitConfig: (patientData: HomeVisitConfigAttributes, appointmentInput: AppointmentAttributes) => Promise<HomeVisitConfigAttributes | null>
  getAllHomeVisitConfig: () => Promise<HomeVisitConfigAttributes[]>
  getHomeVisitConfigById: (id: string) => Promise<HomeVisitConfigAttributes | null>
}
