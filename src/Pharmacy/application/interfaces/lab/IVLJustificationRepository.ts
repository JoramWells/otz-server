import { VLReasonsInterface } from "otz-types"

export interface IVLJustificationRepository {
  create: (data: VLReasonsInterface) => Promise<VLReasonsInterface | null>;
  find: () => Promise<VLReasonsInterface[]>;
  findById: (id: string) => Promise<VLReasonsInterface | null>;
}
