// import { type Patient } from '../../domain/entities/PatientEntity'
import { type NextOfKinEntity } from '../../domain/entities/NextOfKinEntity'
import { type PatientEntity } from '../../domain/entities/PatientEntity'
import { type IPatientInteractor } from '../interfaces/IPatientInteractor'
import { type IPatientRepository } from '../interfaces/IPatientRepository'

export class PatientInteractor implements IPatientInteractor {
  private readonly repository: IPatientRepository

  constructor (repository: IPatientRepository) {
    this.repository = repository
  }

  async getPatientById (id: string): Promise<PatientEntity | null> {
    return await this.repository.findById(id)
  }

  async createPatient (patientData: PatientEntity, nextOfKinData: NextOfKinEntity): Promise<string | null> {
    return await this.repository.create(patientData, nextOfKinData)
  }

  async getAllPatients (): Promise<PatientEntity[]> {
    return await this.repository.find()
  }
}
