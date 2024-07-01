import { MeasuringUnitInterface } from "otz-types"

export interface IMeasuringUnitInteractor {
  createMeasuringUnit: (data: MeasuringUnitInterface) => Promise<MeasuringUnitInterface | null>
  getAllMeasuringUnits: () => Promise<MeasuringUnitInterface[]>
  getMeasuringUnitById: (id: string) => Promise<MeasuringUnitInterface | null>
}
