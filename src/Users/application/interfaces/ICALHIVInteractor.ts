import { CALHIVInterface } from "otz-types"

export interface ICALHIVInteractor {
  createCalHIV: (
    patientData: CALHIVInterface
  ) => Promise<CALHIVInterface>;
  getAllCalHIVs: (
    hospitalID: string
  ) => Promise<CALHIVInterface[] | null | undefined>;
  getCalHIVById: (id: string) => Promise<CALHIVInterface | null>;
  getCalHIVByPatientId: (
    id: string
  ) => Promise<CALHIVInterface | null | undefined>;
}
