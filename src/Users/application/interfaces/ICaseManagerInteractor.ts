import { CaseManagerInterface } from "otz-types"

export interface ICaseManagerInteractor {
  createCaseManager: (
    patientData: CaseManagerInterface
  ) => Promise<CaseManagerInterface>;
  getAllCaseManagers: () => Promise<CaseManagerInterface[]>;
  getCaseManagerById: (id: string) => Promise<CaseManagerInterface | null>;
  getCaseManagerByPatientId: (id: string) => Promise<CaseManagerInterface[] | null>;
}
