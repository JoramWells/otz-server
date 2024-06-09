import { FullDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/FullDisclosureEntity";
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

  async getAllFullDisclosure(): Promise<FullDisclosureEntity[]> {
    return await this.repository.find()
  }

  async getFullDisclosureById(id: string): Promise<FullDisclosureEntity | null> {
    return await this.repository.findById(id);
  }

  async createFullDisclosure(patientData: FullDisclosureEntity): Promise<FullDisclosureEntity> {
    return await this.repository.create(patientData);
  }

  async getAllFullDisclosureByVisitId(): Promise<FullDisclosureEntity[]> {
    return await this.repository.find();
  }
}
