// import { type Patient } from '../../domain/entities/PatientEntity'
import { UserAvailabilityAttributes } from 'otz-types'
import { type IUserAvailabilityInteractor } from '../interfaces/IUserAvailabilityInteractor'
import { type IUserAvailabilityRepository } from '../interfaces/IUserAvailabilityRepository'

export class UserAvailabilityInteractor implements IUserAvailabilityInteractor {
  private readonly repository: IUserAvailabilityRepository;

  constructor(repository: IUserAvailabilityRepository) {
    this.repository = repository;
  }

  async getUserAvailabilityById(
    id: string
  ): Promise<UserAvailabilityAttributes | null> {
    return await this.repository.findById(id);
  }

  async createUserAvailability(
    patientData: UserAvailabilityAttributes
  ): Promise<UserAvailabilityAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllUserAvailabilities(): Promise<UserAvailabilityAttributes[]> {
    return await this.repository.find();
  }

  //
  async editUserAvailability(
    data: UserAvailabilityAttributes
  ): Promise<UserAvailabilityAttributes | null> {
    return await this.repository.edit(data);
  }
}
