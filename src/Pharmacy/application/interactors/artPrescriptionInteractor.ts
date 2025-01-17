import { ARTPrescriptionInterface } from 'otz-types'
import { type IARTPrescriptionInteractor } from '../interfaces/art/IARTPrescriptionInteractor'
import { type IARTPrescriptionRepository } from '../interfaces/art/IARTPrescriptionRepository'

export class ArtPrescriptionInteractor implements IARTPrescriptionInteractor {
  private readonly repository: IARTPrescriptionRepository;

  constructor(repository: IARTPrescriptionRepository) {
    this.repository = repository;
  }

  async getARTPrescriptionById(
    id: string
  ): Promise<ARTPrescriptionInterface | null> {
    return await this.repository.findById(id);
  }

  async createARTPrescription(
    data: ARTPrescriptionInterface
  ): Promise<ARTPrescriptionInterface | null> {
    return await this.repository.create(data);
  }

  async getAllARTPrescriptions(
    hospitalID: string | undefined
  ): Promise<ARTPrescriptionInterface[] | null> {
    return await this.repository.find(hospitalID);
  }

  //
  async getPrescriptionByCategory(
    hospitalID: string | undefined
  ): Promise<ARTPrescriptionInterface[] | null | undefined> {
    return await this.repository.findPrescriptionByCategory(hospitalID);
  }
}
