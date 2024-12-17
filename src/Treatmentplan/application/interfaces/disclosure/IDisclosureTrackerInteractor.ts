import { DisclosureTrackerInterface, PaginatedResponseInterface } from "otz-types";

export interface IDisclosureTrackerInteractor {
  createDisclosureTracker: (
    data: DisclosureTrackerInterface
  ) => Promise<DisclosureTrackerInterface>;
  getAllDisclosureTracker: (
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string,
    hasFullDisclosure?: string,
    hasPartialDisclosure?: string
  ) => Promise<
    PaginatedResponseInterface<DisclosureTrackerInterface> | null | undefined
  >;
  getDisclosureTrackerById: (
    id: string
  ) => Promise<DisclosureTrackerInterface | null>;
  groupUsersByFullStatus: (
    hospitalID?: string
  ) => Promise<DisclosureTrackerInterface[] | undefined | null>;
  groupUsersByPartialStatus: (
    hospitalID?: string
  ) => Promise<DisclosureTrackerInterface[] | undefined | null>;
}
