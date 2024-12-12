import { FullDisclosureAttributes } from "otz-types";
import { IFullDisclosureInteractor } from "../../../interfaces/disclosure/full/IFullDisclosureInteractor";
import { IFullDisclosureRepository } from "../../../interfaces/disclosure/full/IFullDisclosureRepository";
import { FullDisclosureResponseInterface } from "../../../../entities/FullDisclosureResponseInterface";


export class FullDisclosureInteractor implements IFullDisclosureInteractor {
  private readonly repository: IFullDisclosureRepository;

  constructor(repository: IFullDisclosureRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllFullDisclosure(
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ): Promise<FullDisclosureResponseInterface | undefined | null> {
    return await this.repository.find(hospitalID, page, pageSize, searchQuery);
  }

  async getFullDisclosureById(
    id: string
  ): Promise<FullDisclosureAttributes | null> {
    return await this.repository.findById(id);
  }

  async getFullDisclosureByPatientId(
    id: string
  ): Promise<FullDisclosureAttributes | null | undefined> {
    return await this.repository.findByPatientId(id);
  }

  async createFullDisclosure(
    patientData: FullDisclosureAttributes
  ): Promise<FullDisclosureAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllFullDisclosureByVisitId(id: string): Promise<FullDisclosureAttributes[] | null> {
    return await this.repository.findAllByVisitId(id);
  }

  //
  async getFullDisclosureScoreCategory(hospitalID: string | undefined): Promise<FullDisclosureAttributes[] | undefined | null> {
    return await this.repository.findFullDisclosureScoreCategory(hospitalID);
  }
}
