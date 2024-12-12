import { MMASEightAttributes, MMASFourAttributes } from "otz-types";
import { IMMASEightInteractor } from "../../interfaces/treatmentplan/IMMAS8Interactor";
import { IMMASEightRepository } from "../../interfaces/treatmentplan/IMMAS8Repository";

export class MMASEightInteractor implements IMMASEightInteractor {
  private readonly repository: IMMASEightRepository;

  constructor(repository: IMMASEightRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getMMASEightById(
    id: string
  ): Promise<MMASEightAttributes | null | undefined> {
    return await this.repository.findById(id);
  }

  async getMMASEightByPatientId(
    id: string
  ): Promise<MMASEightAttributes | null | undefined> {
    return await this.repository.findByPatientId(id);
  }

  async getMMASEightByVisitId(
    id: string
  ): Promise<MMASEightAttributes | null | undefined> {
    return await this.repository.findByVisitId(id);
  }

  async createMMASEight(
    data4: MMASFourAttributes,
    patientData: MMASEightAttributes
  ): Promise<MMASEightAttributes> {
    return await this.repository.create(data4, patientData);
  }

  async getAllMMASEight(
    hospitalID: string
  ): Promise<MMASEightAttributes[] | null> {
    return await this.repository.find(hospitalID);
  }
}
