import { ViralLoadInterface } from "otz-types";
import { IViralLoadInteractor } from "../../interfaces/lab/IViralLoadInteractor";
import { IViralLoadRepository } from "../../interfaces/lab/IViralLoadRepository";
import { ViralLoadResponseInterface } from "../../../entities/ViralLoadResponseInterface";

export class ViralLoadInteractor implements IViralLoadInteractor {
  private readonly repository: IViralLoadRepository;

  constructor(repository: IViralLoadRepository) {
    this.repository = repository;
  }

  async getViralLoadById(
    id: string
  ): Promise<ViralLoadInterface | null | undefined> {
    return await this.repository.findById(id);
  }

  async getAllViralLoadByPatientID(
    id: string
  ): Promise<ViralLoadInterface[] | null | undefined> {
    return await this.repository.findAllByPatientId(id);
  }

  async getViralLoadByPatientID(
    patientID: string
  ): Promise<ViralLoadInterface | null | undefined> {
    return await this.repository.findByPatientId(patientID);
  }

  async getAllVlCategories(
    hospitalID: string
  ): Promise<ViralLoadInterface[] | null | undefined> {
    return await this.repository.findCategories(hospitalID);
  }

  //
  async getAllVlReasons(
    hospitalID: string,
    dateQuery: string
  ): Promise<ViralLoadInterface[] | null | undefined> {
    return await this.repository.findAllVlReasons(hospitalID, dateQuery);
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
    searchQuery: string,
    vlResults: string,
    vlJustification: string,
    status: string
  ): Promise<ViralLoadResponseInterface | null | undefined> {
    return await this.repository.find(
      hospitalID,
      page,
      pageSize,
      searchQuery,
      vlResults,
      vlJustification,
      status
    );
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

  //
  async getStarredViralLoad(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<ViralLoadResponseInterface | null | undefined> {
    return await this.repository.findStarredViralLoad(
      hospitalID,
      page,
      pageSize,
      searchQuery
    );
  }

  //
  async getRecentViralLoad(
    id?: string
  ): Promise<ViralLoadInterface[] | null | undefined> {
    return await this.repository.findRecent(id);
  }

  //
  async getViralLoadForAppointment(
    patientID: string,
    dateOfNextVL: string | Date
  ): Promise<ViralLoadInterface | null | undefined> {
    return await this.repository.findForAppointment(patientID, dateOfNextVL);
  }
}
