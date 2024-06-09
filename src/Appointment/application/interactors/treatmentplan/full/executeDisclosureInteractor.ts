import { ExecuteDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/ExecuteDisclosureEntity";
import { IExecuteDisclosureInteractor } from "../../../interfaces/disclosure/full/IExecuteDisclosureInteractor";
import { IExecuteDisclosureRepository } from "../../../interfaces/disclosure/full/IExecuteDisclosureRepository";



export class ExecuteDisclosureInteractor implements IExecuteDisclosureInteractor {
  private readonly repository: IExecuteDisclosureRepository;

  constructor(repository: IExecuteDisclosureRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllExecuteDisclosure(): Promise<ExecuteDisclosureEntity[]> {
    return await this.repository.find()
  }

  async getExecuteDisclosureById(id: string): Promise<ExecuteDisclosureEntity | null> {
    return await this.repository.findById(id);
  }

  async createExecuteDisclosure(patientData: ExecuteDisclosureEntity): Promise<ExecuteDisclosureEntity> {
    return await this.repository.create(patientData);
  }

  async getAllExecuteDisclosureByVisitId(): Promise<ExecuteDisclosureEntity[]> {
    return await this.repository.find();
  }
}
