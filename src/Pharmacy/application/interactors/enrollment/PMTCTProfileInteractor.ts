// import { type Patient } from '../../domain/entities/PatientEntity'
import { type PMTCTProfileEntity } from '../../domain/entities/PMTCTProfileEntity'
import { type IPMTCTProfileInteractor } from '../interfaces/IPMTCTProfileInteractor'
import { type IPMTCTProfileRepository } from '../interfaces/IPMTCTProfileRepository'

export class PMTCTInteractor implements IPMTCTProfileInteractor {
  private readonly repository: IPMTCTProfileRepository

  constructor (repository: IPMTCTProfileRepository) {
    this.repository = repository
  }

  async getPMTCTProfileById (id: string): Promise<PMTCTProfileEntity | null> {
    return await this.repository.findById(id)
  }

  async createPMTCTProfile (
    patientData: PMTCTProfileEntity
  ): Promise<PMTCTProfileEntity> {
    return await this.repository.create(patientData)
  }

  async getAllPMTCTProfiles (): Promise<PMTCTProfileEntity[]> {
    return await this.repository.find()
  }
}
