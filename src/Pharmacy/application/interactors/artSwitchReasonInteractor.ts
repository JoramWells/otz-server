import { type IARTSwitchReasonInteractor } from '../interfaces/art/IARTSwitchReasonInteractor'
import { type IARTSwitchReasonRepository } from '../interfaces/art/IARTSwitchReasonRepository'
import { ARTSwitchReasonInterface } from "otz-types";
export class ARTSwitchReasonInteractor implements IARTSwitchReasonInteractor {
  private readonly repository: IARTSwitchReasonRepository;

  constructor(repository: IARTSwitchReasonRepository) {
    this.repository = repository;
  }

  async getARTSwitchReasonsById(
    id: string
  ): Promise<ARTSwitchReasonInterface | null> {
    return await this.repository.findById(id);
  }

  async createARTSwitchReasons(
    patientData: ARTSwitchReasonInterface
  ): Promise<ARTSwitchReasonInterface | null> {
    return await this.repository.create(patientData);
  }

  async getAllARTSwitchReasons(): Promise<ARTSwitchReasonInterface[]> {
    return await this.repository.find();
  }
}
