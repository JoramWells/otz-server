
import { OTZEnrollmentsInterface } from "otz-types";

import { IOTZInteractor } from "../../interfaces/enrollment/IOTZInteractor"
import { IOTZRepository } from "../../interfaces/enrollment/IOTZRepository"

export class OTZInteractor implements IOTZInteractor {
  private readonly repository: IOTZRepository

  constructor (repository: IOTZRepository) {
    this.repository = repository
  }

  async getOTZById (id: string): Promise<OTZEnrollmentsInterface | null> {
    return await this.repository.findById(id)
  }

  async createOTZ (
    patientData: OTZEnrollmentsInterface
  ): Promise<OTZEnrollmentsInterface> {
    return await this.repository.create(patientData)
  }

  async getAllOTZs (hospitalID: string): Promise<OTZEnrollmentsInterface[] | null> {
    return await this.repository.find(hospitalID)
  }
    async deleteOTZ(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
