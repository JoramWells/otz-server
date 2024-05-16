import { type PatientAllergiesEntity } from '../../domain/entities/PatientAllergiesEntity'
import { type IPatientAllergiesInteractor } from '../interfaces/IPatientAllergiesInteractor'
import { type IPatientAllergiesRepository } from '../interfaces/IPatientAllergiesRepository'

export class PatientAllergiesInteractor implements IPatientAllergiesInteractor {
  private readonly repository: IPatientAllergiesRepository

  constructor (repository: IPatientAllergiesRepository) {
    this.repository = repository
  }

  async getPatientAllergiesById (id: string): Promise<PatientAllergiesEntity | null> {
    return await this.repository.findById(id)
  }

  async createPatientAllergies (patientData: PatientAllergiesEntity): Promise<PatientAllergiesEntity | null> {
    return await this.repository.create(patientData)
  }

  async getAllPatientAllergies (): Promise<PatientAllergiesEntity[]> {
    return await this.repository.find()
  }
}
