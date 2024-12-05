import { CALHIVInterface } from "otz-types"

export interface ICALHIVInteractor {
  createCalHIV: (
    patientData: CALHIVInterface
  ) => Promise<CALHIVInterface>;
  getAllCalHIVs: (
    hospitalID: string
  ) => Promise<CALHIVInterface[] | null | undefined>;
  getCalHIVByHospitalId: (id: string) => Promise<CALHIVInterface | null | undefined>;
}
