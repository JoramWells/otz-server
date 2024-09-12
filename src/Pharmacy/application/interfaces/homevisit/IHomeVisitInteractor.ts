import { AppointmentAttributes, HomeVisitAttributes } from "otz-types"

export interface IHomeVisitInteractor {
  createHomeVisit: (patientData: HomeVisitAttributes, appointmentInput: AppointmentAttributes) => Promise<HomeVisitAttributes | null>
  getAllHomeVisits: () => Promise<HomeVisitAttributes[]>
  getHomeVisitById: (id: string) => Promise<HomeVisitAttributes | null>
  getAllHomeVisitById: (id: string) => Promise<HomeVisitAttributes[] | null>
}
