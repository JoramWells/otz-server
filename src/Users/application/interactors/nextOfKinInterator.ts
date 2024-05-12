// import { type Patient } from '../../domain/entities/PatientEntity'
import { type NextOfKinEntity } from '../../domain/entities/NextOfKinEntity'
import { type INextOfKinInteractor } from '../interfaces/INextOfKinInteractor'
import { type INextOfKinRepository } from '../interfaces/INextOfKinRepository'

export class NextOfKinInteractor implements INextOfKinInteractor {
  private readonly repository: INextOfKinRepository

  constructor (repository: INextOfKinRepository) {
    this.repository = repository
  }

  async getNextOfKinById (id: string): Promise<NextOfKinEntity[] | null> {
    return await this.repository.findById(id)
  }

  async createNextOfKin (
    patientData: NextOfKinEntity
  ): Promise<NextOfKinEntity> {
    return await this.repository.create(patientData)
  }

  async getAllNextOfKins (): Promise<NextOfKinEntity[]> {
    return await this.repository.find()
  }
}
