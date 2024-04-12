import { type Patient } from '../../domain/entities/Patient'
import { type IPatientInteractor } from '../interfaces/IPatientInteractor'
import { type IPatientRepository } from '../interfaces/IPatientRepository'

export class PatientInteractor implements IPatientInteractor {
  private readonly repository: IPatientRepository

  constructor (repository: IPatientRepository) {
    this.repository = repository
  }

  async getPatientById (id: string): Promise<Patient> {
    return await this.repository.findById(id)
  }

  async createPatient (patientData: any): Promise<Patient> {
    return await this.repository.create(patientData)
  }

  async getAllPatients () {
    return await this.repository.find()
  }
}
