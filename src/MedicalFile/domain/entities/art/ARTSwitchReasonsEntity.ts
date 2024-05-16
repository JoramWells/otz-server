import { type ARTSwitchReasonInterface } from '../../models/art/artSwitchReasons.model'

export class ARTSwitchReasonsEntity implements ARTSwitchReasonInterface {
  constructor (
    public id: string,
    public reason: string
  ) {}
}
