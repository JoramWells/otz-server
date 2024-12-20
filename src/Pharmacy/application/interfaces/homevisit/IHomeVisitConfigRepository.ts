import {
  AppointmentAttributes,
  HomeVisitConfigAttributes,
  PaginatedResponseInterface,
} from "otz-types";

export interface IHomeVisitConfigRepository {
  create: (
    data: HomeVisitConfigAttributes
  ) => Promise<HomeVisitConfigAttributes | null>;
  find: (
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string
  ) => Promise<
    PaginatedResponseInterface<HomeVisitConfigAttributes> | undefined | null
  >;
  findById: (id: string) => Promise<HomeVisitConfigAttributes | null>;
}
