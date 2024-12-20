import {
  AppointmentAttributes,
  HomeVisitConfigAttributes,
  PaginatedResponseInterface,
} from "otz-types";

export interface IHomeVisitConfigInteractor {
  createHomeVisitConfig: (
    patientData: HomeVisitConfigAttributes
  ) => Promise<HomeVisitConfigAttributes | null>;
  getAllHomeVisitConfig: (
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string
  ) => Promise<
    PaginatedResponseInterface<HomeVisitConfigAttributes> | undefined | null
  >;
  getHomeVisitConfigById: (
    id: string
  ) => Promise<HomeVisitConfigAttributes | null>;
}
