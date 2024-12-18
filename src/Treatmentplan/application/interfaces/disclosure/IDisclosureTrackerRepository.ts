import { DisclosureTrackerInterface, PaginatedResponseInterface } from "otz-types";

export interface IDisclosureTrackerRepository {
  create: (
    data: DisclosureTrackerInterface
  ) => Promise<DisclosureTrackerInterface>;
  findFullDisclosure: (
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string,
    hasFullDisclosure?: string
  ) => Promise<
    PaginatedResponseInterface<DisclosureTrackerInterface> | null | undefined
  >;
  findPartialDisclosure: (
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string,
    hasPartialDisclosure?: string
  ) => Promise<
    PaginatedResponseInterface<DisclosureTrackerInterface> | null | undefined
  >;
  findById: (id: string) => Promise<DisclosureTrackerInterface | null>;
  findUsersByPartialStatus: (
    hospitalID?: string
  ) => Promise<DisclosureTrackerInterface[] | undefined | null>;
  findUsersByFullStatus: (
    hospitalID?: string
  ) => Promise<DisclosureTrackerInterface[] | undefined | null>;
  // count: () => Promise<MMASEntity | null>;
}
