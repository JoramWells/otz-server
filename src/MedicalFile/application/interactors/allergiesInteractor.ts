// import { type Patient } from '../../domain/entities/PatientEntity'
import { type AllergiesEntity } from '../../domain/entities/AllergiesEntity'
import { type IAllergiesInteractor } from '../interfaces/IAllergiesInteractor'
import { type IAllergiesRepository } from '../interfaces/IAllergiesRepository'

export class AllergiesInteractor implements IAllergiesInteractor {
  private readonly repository: IAllergiesRepository

  constructor (repository: IAllergiesRepository) {
    this.repository = repository
  }

  async getAllergiesById (id: string): Promise<AllergiesEntity | null> {
    return await this.repository.findById(id)
  }

  async createAllergies (data: AllergiesEntity): Promise<AllergiesEntity | null> {
    return await this.repository.create(data)
  }

  async getAllAllergies (): Promise<AllergiesEntity[]> {
    return await this.repository.find()
  }
}
