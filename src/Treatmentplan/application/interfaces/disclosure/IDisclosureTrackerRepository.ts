import { DisclosureTrackerInterface, PaginatedResponseInterface } from "otz-types";

export interface IDisclosureTrackerRepository {
  create: (
    data: DisclosureTrackerInterface
  ) => Promise<DisclosureTrackerInterface>;
  find: (
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string,
    hasFullDisclosure?: string,
    hasPartialDisclosure?: string
  ) => Promise<
    PaginatedResponseInterface<DisclosureTrackerInterface> | null | undefined
  >;
  findById: (id: string) => Promise<DisclosureTrackerInterface | null>;
  // count: () => Promise<MMASEntity | null>;
}
