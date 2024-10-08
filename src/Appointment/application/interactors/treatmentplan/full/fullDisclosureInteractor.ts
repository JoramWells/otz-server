import { FullDisclosureAttributes } from "otz-types";
import { IFullDisclosureInteractor } from "../../../interfaces/disclosure/full/IFullDisclosureInteractor";
import { IFullDisclosureRepository } from "../../../interfaces/disclosure/full/IFullDisclosureRepository";


export class FullDisclosureInteractor implements IFullDisclosureInteractor {
  private readonly repository: IFullDisclosureRepository;

  constructor(repository: IFullDisclosureRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllFullDisclosure(): Promise<FullDisclosureAttributes[]> {
    return await this.repository.find()
  }

  async getFullDisclosureById(id: string): Promise<FullDisclosureAttributes | null> {
    return await this.repository.findById(id);
  }

  async createFullDisclosure(patientData: FullDisclosureAttributes): Promise<FullDisclosureAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllFullDisclosureByVisitId(): Promise<FullDisclosureAttributes[]> {
    return await this.repository.find();
  }
}
