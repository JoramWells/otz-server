import { AppointmentAttributes, HomeVisitAttributes, PaginatedResponseInterface } from "otz-types"

export interface IHomeVisitInteractor {
  createHomeVisit: (
    patientData: HomeVisitAttributes,
    appointmentInput: AppointmentAttributes
  ) => Promise<HomeVisitAttributes | null>;
  getAllHomeVisits: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery?: string
  ) => Promise<PaginatedResponseInterface<HomeVisitAttributes> | undefined | null>;
  getHomeVisitById: (id: string) => Promise<HomeVisitAttributes | null>;
  getAllHomeVisitById: (id: string) => Promise<HomeVisitAttributes[] | null>;
}
