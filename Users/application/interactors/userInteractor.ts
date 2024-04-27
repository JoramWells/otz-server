// import { type Patient } from '../../domain/entities/PatientEntity'
import { type UserEntity } from '../../domain/entities/UserEntity'
import { type IUserInteractor } from '../interfaces/IUserInteractor'
import { type IUserRepository } from '../interfaces/IUserRepository'

export class UserInteractor implements IUserInteractor {
  private readonly repository: IUserRepository

  constructor (repository: IUserRepository) {
    this.repository = repository
  }

  async getUserById (id: string): Promise<UserEntity | null> {
    return await this.repository.findById(id)
  }

  async createUser (patientData: UserEntity): Promise<UserEntity> {
    return await this.repository.create(patientData)
  }

  async getAllUsers (): Promise<UserEntity[]> {
    return await this.repository.find()
  }
}
