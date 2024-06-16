// import { type Patient } from '../../domain/entities/PatientEntity'
import { type UserAvailabilityEntity } from '../../domain/entities/UserAvailailityEntity'
import { type IUserAvailabilityInteractor } from '../interfaces/IUserAvailabilityInteractor'
import { type IUserAvailabilityRepository } from '../interfaces/IUserAvailabilityRepository'

export class UserAvailabilityInteractor implements IUserAvailabilityInteractor {
  private readonly repository: IUserAvailabilityRepository

  constructor (repository: IUserAvailabilityRepository) {
    this.repository = repository
  }

  async getUserAvailabilityById (id: string): Promise<UserAvailabilityEntity | null> {
    return await this.repository.findById(id)
  }

  async createUserAvailability (patientData: UserAvailabilityEntity): Promise<UserAvailabilityEntity> {
    return await this.repository.create(patientData)
  }

  async getAllUserAvailabilities (): Promise<UserAvailabilityEntity[]> {
    return await this.repository.find()
  }
}
