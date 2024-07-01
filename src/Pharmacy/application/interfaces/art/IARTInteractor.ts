import { UserInterface } from "otz-types"

export interface IARTInteractor {
  createART: (data: UserInterface) => Promise<UserInterface | null>
  getAllARTs: () => Promise<UserInterface[]>
  getARTById: (id: string) => Promise<UserInterface | null>
}
