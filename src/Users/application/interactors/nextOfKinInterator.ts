// import { type Patient } from '../../domain/entities/PatientEntity'
import { NextOfKinInterface } from 'otz-types'
import { type INextOfKinInteractor } from '../interfaces/INextOfKinInteractor'
import { type INextOfKinRepository } from '../interfaces/INextOfKinRepository'

export class NextOfKinInteractor implements INextOfKinInteractor {
  private readonly repository: INextOfKinRepository

  constructor (repository: INextOfKinRepository) {
    this.repository = repository
  }

  async getNextOfKinById (id: string): Promise<NextOfKinInterface[] | null> {
    return await this.repository.findById(id)
  }

  async createNextOfKin (
    patientData: NextOfKinInterface
  ): Promise<NextOfKinInterface> {
    return await this.repository.create(patientData)
  }

  async getAllNextOfKins (): Promise<NextOfKinInterface[]> {
    return await this.repository.find()
  }
}
