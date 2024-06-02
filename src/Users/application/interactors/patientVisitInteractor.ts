// import { type Patient } from '../../domain/entities/PatientEntity'
import { type PatientVisitsEntity } from '../../domain/entities/PatientVisitsEntity'
import { type IPatientVisitInteractor } from '../interfaces/IPatientVisitInteractor'
import { type IPatientVisitsRepository } from '../interfaces/IPatientVisitsRepository'

export class PatientVisitInteractor implements IPatientVisitInteractor {
  private readonly repository: IPatientVisitsRepository

  constructor (repository: IPatientVisitsRepository) {
    this.repository = repository
  }

  async getHistoryPatientVisitById (id: string): Promise<PatientVisitsEntity[] | null> {
    return await this.repository.findHistoryById(id)
  }

  async getPatientVisitById (id: string): Promise<PatientVisitsEntity | null> {
    return await this.repository.findById(id)
  }

  async createPatientVisit (patientData: PatientVisitsEntity): Promise<PatientVisitsEntity | null> {
    return await this.repository.create(patientData)
  }

  async getAllPatientVisits (): Promise<PatientVisitsEntity[]> {
    return await this.repository.find()
  }
}
