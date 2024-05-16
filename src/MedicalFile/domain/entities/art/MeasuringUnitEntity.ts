import { type MeasuringUnitInterface } from '../../models/art/measuringUnit.model'

export class MeasuringUnitEntity implements MeasuringUnitInterface {
  constructor (
    public id: string,
    public description: string
  ) {}
}
