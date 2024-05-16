import { type MeasuringUnitEntity } from '../../../domain/entities/art/MeasuringUnitEntity'

export interface IMeasuringUnitRepository {
  create: (data: MeasuringUnitEntity) => Promise<MeasuringUnitEntity | null>
  find: () => Promise<MeasuringUnitEntity[]>
  findById: (id: string) => Promise<MeasuringUnitEntity | null>
}
