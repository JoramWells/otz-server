import { FacilityMAPSInterface } from "otz-types";
import { IFacilityMAPCSVInteractor } from "../../interfaces/etl/IFacilityMAPSInteractor";
import { IFacilityMAPRepository } from "../../interfaces/etl/IFacilityMAPRepository";



export class FacilityMAPCSVInteractor implements IFacilityMAPCSVInteractor {
  private readonly repository: IFacilityMAPRepository;

  constructor(repository: IFacilityMAPRepository) {
    this.repository = repository;
  }

  async createFacilityMAP(
    patientData: FacilityMAPSInterface
  ): Promise<FacilityMAPSInterface> {
    return await this.repository.create(patientData);
  }

  async getAllFacilityMAPs(): Promise<FacilityMAPSInterface[]> {
    return await this.repository.find();
  }

  async getFacilityMAPById(id: string): Promise<FacilityMAPSInterface | null> {
    return await this.repository.findById(id);
  }
}
