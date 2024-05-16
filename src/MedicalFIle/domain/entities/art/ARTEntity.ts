import { type ARTInterface } from '../../models/art/art.model'

export class ARTEntity implements ARTInterface {
  constructor (
    public id: string,
    public artName: string,
    public artCategoryID: string,
    public measuringUnitID: string,
    public quantity: number,
    public expiryDate: Date
  ) {}
}
