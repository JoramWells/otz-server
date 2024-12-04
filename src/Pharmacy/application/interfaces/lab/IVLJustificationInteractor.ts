import { VLReasonsInterface } from "otz-types"

export interface IVLJustificationInteractor {
  createJustification: (data: VLReasonsInterface) => Promise<VLReasonsInterface | null>
  getAllJustifications: () => Promise<VLReasonsInterface[]>
  getJustificationById: (id: string) => Promise<VLReasonsInterface | null>
}
