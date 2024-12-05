import { CALHIVInterface } from "otz-types"

export interface ICALHIVRepository {
  create: (data: CALHIVInterface) => Promise<CALHIVInterface>;
  find: (hospitalID: string) => Promise<CALHIVInterface[] | undefined | null>;
  findByHospitalId: (hospitalID: string) => Promise<CALHIVInterface | null | undefined>;
}
