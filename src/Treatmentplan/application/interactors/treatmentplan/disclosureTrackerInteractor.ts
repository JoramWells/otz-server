import {
  DisclosureTrackerInterface,
  PaginatedResponseInterface,
} from "otz-types";
import { IDisclosureTrackerInteractor } from "../../interfaces/disclosure/IDisclosureTrackerInteractor";
import { IDisclosureTrackerRepository } from "../../interfaces/disclosure/IDisclosureTrackerRepository";

export class DisclosureTrackerInteractor implements IDisclosureTrackerInteractor {
  private readonly repository: IDisclosureTrackerRepository;

  constructor(repository: IDisclosureTrackerRepository) {
    this.repository = repository;
  }
  async getDisclosureTrackerById(
    id: string
  ): Promise<DisclosureTrackerInterface | null> {
    return await this.repository.findById(id);
  }

  async createDisclosureTracker(
    patientData: DisclosureTrackerInterface
  ): Promise<DisclosureTrackerInterface> {
    return await this.repository.create(patientData);
  }

  async getAllDisclosureTracker(
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string,
    hasFullDisclosure?: string,
    hasPartialDisclosure?: string
  ): Promise<
    PaginatedResponseInterface<DisclosureTrackerInterface> | null | undefined
  > {
    return await this.repository.find(
      hospitalID,
      page,
      pageSize,
      searchQuery,
      hasFullDisclosure,
      hasPartialDisclosure
    );
  }

  //
  async groupUsersByFullStatus(
    hospitalID?: string
  ): Promise<DisclosureTrackerInterface[] | null | undefined> {
    return await this.repository.findUsersByFullStatus(hospitalID);
  }

  //
  async groupUsersByPartialStatus(
    hospitalID?: string
  ): Promise<DisclosureTrackerInterface[] | null | undefined> {
    return await this.repository.findUsersByPartialStatus(hospitalID);
  }
}