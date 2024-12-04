
import { ViralLoadInterface } from "otz-types";
import { IViralLoadInteractor } from "../../interfaces/lab/IViralLoadInteractor";
import { IViralLoadRepository } from "../../interfaces/lab/IViralLoadRepository";
import { ViralLoadResponseInterface } from "../../../entities/ViralLoadResponseInterface";


export class ViralLoadInteractor implements IViralLoadInteractor {
  private readonly repository: IViralLoadRepository;

  constructor(repository: IViralLoadRepository) {
    this.repository = repository;
  }

  async getViralLoadById(id: string): Promise<ViralLoadInterface | null> {
    return await this.repository.findById(id);
  }

  async getAllViralLoadByPatientID(
    id: string
  ): Promise<ViralLoadInterface[] | null> {
    return await this.repository.findByPatientId(id);
  }

  async getAllVlCategories(
    hospitalID: string
  ): Promise<ViralLoadInterface[] | null> {
    return await this.repository.findCategories(hospitalID);
  }

  async createViralLoad(
    patientData: ViralLoadInterface
  ): Promise<ViralLoadInterface> {
    return await this.repository.create(patientData);
  }

  async getAllViralLoads(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<ViralLoadResponseInterface | null | undefined> {
    return await this.repository.find(hospitalID, page, pageSize, searchQuery);
  }

  //
  async getSuppressionRate(
    hospitalID: string,
    startDate: Date | string,
    endDate: Date | string
  ): Promise<ViralLoadInterface[] | null | undefined> {
    return await this.repository.findSuppressionRate(
      hospitalID,
      startDate,
      endDate
    );
  }
}
