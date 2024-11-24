
import { OTZEnrollmentsInterface } from "otz-types";

import { IOTZInteractor } from "../../interfaces/enrollment/IOTZInteractor"
import { IOTZRepository } from "../../interfaces/enrollment/IOTZRepository"
import { OTZResponseInterface } from "../../../domain/models/enrollment/otz.model";

export class OTZInteractor implements IOTZInteractor {
  private readonly repository: IOTZRepository;

  constructor(repository: IOTZRepository) {
    this.repository = repository;
  }

  async getOTZById(id: string): Promise<OTZEnrollmentsInterface | null> {
    return await this.repository.findById(id);
  }

  async createOTZ(
    patientData: OTZEnrollmentsInterface
  ): Promise<OTZEnrollmentsInterface> {
    return await this.repository.create(patientData);
  }

  async getAllOTZs(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<OTZResponseInterface | null> {
    return await this.repository.find(hospitalID,page, pageSize, searchQuery);
  }
  async deleteOTZ(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
