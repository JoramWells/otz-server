import { MeasuringUnitInterface } from "otz-types"

export interface IMeasuringUnitRepository {
  create: (data: MeasuringUnitInterface) => Promise<MeasuringUnitInterface | null>
  find: () => Promise<MeasuringUnitInterface[]>
  findById: (id: string) => Promise<MeasuringUnitInterface | null>
}
