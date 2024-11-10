// import { type Patient } from '../../domain/entities/PatientEntity'
import { PatientVisitsInterface } from 'otz-types'
import { type IPatientVisitInteractor } from '../interfaces/IPatientVisitInteractor'
import { type IPatientVisitsRepository } from '../interfaces/IPatientVisitsRepository'

export class PatientVisitInteractor implements IPatientVisitInteractor {
  private readonly repository: IPatientVisitsRepository

  constructor (repository: IPatientVisitsRepository) {
    this.repository = repository
  }

  async getHistoryPatientVisitById (id: string): Promise<PatientVisitsInterface[] | null> {
    return await this.repository.findHistoryById(id)
  }

  async getPatientVisitById (id: string): Promise<PatientVisitsInterface | null> {
    return await this.repository.findById(id)
  }

    async getPatientVisitByUserId (id: string): Promise<PatientVisitsInterface[] | null> {
    return await this.repository.findPatientVisitByUserId(id)
  }

  async createPatientVisit (patientData: PatientVisitsInterface): Promise<PatientVisitsInterface | null> {
    return await this.repository.create(patientData)
  }

  async getAllPatientVisits (): Promise<PatientVisitsInterface[]> {
    return await this.repository.find()
  }
}
