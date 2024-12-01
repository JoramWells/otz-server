import { CaseManagerInterface } from "otz-types"

export interface ICaseManagerInteractor {
  createCaseManager: (
    patientData: CaseManagerInterface
  ) => Promise<CaseManagerInterface>;
  getAllCaseManagers: (hospitalID: string) => Promise<CaseManagerInterface[] | null | undefined>;
  getCaseManagerById: (id: string) => Promise<CaseManagerInterface | null>;
  getCaseManagerByPatientId: (
    id: string
  ) => Promise<CaseManagerInterface | null | undefined>;
}
