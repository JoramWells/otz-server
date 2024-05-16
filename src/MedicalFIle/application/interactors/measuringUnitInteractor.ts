// import { type Patient } from '../../domain/entities/PatientEntity'
import { type MeasuringUnitEntity } from '../../domain/entities/art/MeasuringUnitEntity'
import { type IMeasuringUnitInteractor } from '../interfaces/art/IMeasuringUnitInteractor'
import { type IMeasuringUnitRepository } from '../interfaces/art/IMeasuringUnitRepository'

export class MeasuringUnitInteractor implements IMeasuringUnitInteractor {
  private readonly repository: IMeasuringUnitRepository

  constructor (repository: IMeasuringUnitRepository) {
    this.repository = repository
  }

  async getMeasuringUnitById (id: string): Promise<MeasuringUnitEntity | null> {
    return await this.repository.findById(id)
  }

  async createMeasuringUnit (
    data: MeasuringUnitEntity
  ): Promise<MeasuringUnitEntity | null> {
    return await this.repository.create(data)
  }

  async getAllMeasuringUnits (): Promise<MeasuringUnitEntity[]> {
    return await this.repository.find()
  }
}
