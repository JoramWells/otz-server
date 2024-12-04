import { CALHIVInterface } from "otz-types"

export interface ICALHIVRepository {
  create: (data: CALHIVInterface) => Promise<CALHIVInterface>;
  find: (hospitalID: string) => Promise<CALHIVInterface[] | undefined | null>;
  findById: (id: string) => Promise<CALHIVInterface | null | undefined>;
}
