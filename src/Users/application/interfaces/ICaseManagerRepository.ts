import { CaseManagerInterface } from "otz-types"

export interface ICaseManagerRepository {
  create: (data: CaseManagerInterface) => Promise<CaseManagerInterface>
  find: () => Promise<CaseManagerInterface[]>
  findById: (id: string) => Promise<CaseManagerInterface | null>
}
