// import { type Patient } from '../../domain/entities/PatientEntity'
import { MeasuringUnitInterface } from 'otz-types'
import { type IMeasuringUnitInteractor } from '../interfaces/art/IMeasuringUnitInteractor'
import { type IMeasuringUnitRepository } from '../interfaces/art/IMeasuringUnitRepository'

export class MeasuringUnitInteractor implements IMeasuringUnitInteractor {
  private readonly repository: IMeasuringUnitRepository

  constructor (repository: IMeasuringUnitRepository) {
    this.repository = repository
  }

  async getMeasuringUnitById (id: string): Promise<MeasuringUnitInterface | null> {
    return await this.repository.findById(id)
  }

  async createMeasuringUnit (
    data: MeasuringUnitInterface
  ): Promise<MeasuringUnitInterface | null> {
    return await this.repository.create(data)
  }

  async getAllMeasuringUnits (): Promise<MeasuringUnitInterface[]> {
    return await this.repository.find()
  }
}
