// import { type Patient } from '../../domain/entities/PatientEntity'
import { VLReasonsInterface } from 'otz-types'
import { IVLJustificationRepository } from '../../interfaces/lab/IVLJustificationRepository';
import { IVLJustificationInteractor } from '../../interfaces/lab/IVLJustificationInteractor';

export class VLJustificationInteractor implements IVLJustificationInteractor {
  private readonly repository: IVLJustificationRepository;

  constructor(repository: IVLJustificationRepository) {
    this.repository = repository;
  }

  async getJustificationById(id: string): Promise<VLReasonsInterface | null> {
    return await this.repository.findById(id);
  }

  async createJustification(
    data: VLReasonsInterface
  ): Promise<VLReasonsInterface | null> {
    return await this.repository.create(data);
  }

  async getAllJustifications(): Promise<VLReasonsInterface[]> {
    return await this.repository.find();
  }
}
