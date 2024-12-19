import { AppointmentAttributes, HomeVisitAttributes, PaginatedResponseInterface } from "otz-types"

export interface IHomeVisitRepository {
  create: (
    data: HomeVisitAttributes,
    appointmentInput: AppointmentAttributes
  ) => Promise<HomeVisitAttributes | null>;
  find: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery?: string
  ) => Promise<PaginatedResponseInterface<HomeVisitAttributes> | undefined | null>;
  findById: (id: string) => Promise<HomeVisitAttributes | null>;
  findAllById: (id: string) => Promise<HomeVisitAttributes[] | null>;
}
