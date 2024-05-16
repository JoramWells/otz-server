import { type MeasuringUnitEntity } from '../../../domain/entities/art/MeasuringUnitEntity'

export interface IMeasuringUnitInteractor {
  createMeasuringUnit: (data: MeasuringUnitEntity) => Promise<MeasuringUnitEntity | null>
  getAllMeasuringUnits: () => Promise<MeasuringUnitEntity[]>
  getMeasuringUnitById: (id: string) => Promise<MeasuringUnitEntity | null>
}
