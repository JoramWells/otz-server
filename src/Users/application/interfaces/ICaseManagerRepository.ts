import { CaseManagerInterface } from "otz-types"

export interface ICaseManagerRepository {
  create: (data: CaseManagerInterface) => Promise<CaseManagerInterface>;
  find: (hospitalID: string) => Promise<CaseManagerInterface[] | null | undefined>;
  findById: (id: string) => Promise<CaseManagerInterface | null>;
  findByPatientId: (
    id: string
  ) => Promise<CaseManagerInterface | null | undefined>;
}
