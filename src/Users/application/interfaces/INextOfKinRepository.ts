import { NextOfKinInterface } from "otz-types"

export interface INextOfKinRepository {
  create: (data: NextOfKinInterface) => Promise<NextOfKinInterface>
  find: () => Promise<NextOfKinInterface[]>
  findById: (id: string) => Promise<NextOfKinInterface[] | null>
}
