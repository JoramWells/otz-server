import { ExecuteDisclosureAttributes } from "otz-types";
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

  async getAllExecuteDisclosure(
    hospitalID: string
  ): Promise<ExecuteDisclosureAttributes[] | null> {
    return await this.repository.find(hospitalID);
  }

  async getExecuteDisclosureById(
    id: string
  ): Promise<ExecuteDisclosureAttributes | null> {
    return await this.repository.findById(id);
  }

  async getExecuteDisclosureByPatientId(
    patientID: string
  ): Promise<ExecuteDisclosureAttributes | null> {
    return await this.repository.findByPatientId(patientID);
  }

  async createExecuteDisclosure(
    patientData: ExecuteDisclosureAttributes
  ): Promise<ExecuteDisclosureAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllExecuteDisclosureByVisitId(): Promise<
    ExecuteDisclosureAttributes[]
  > {
    return await this.repository.find();
  }
}
