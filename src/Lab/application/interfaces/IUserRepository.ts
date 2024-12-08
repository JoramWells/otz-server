import { UserInterface } from "otz-types"

export interface IUserRepository {
  create: (data: UserInterface) => Promise<UserInterface>
  find: () => Promise<UserInterface[]>
  findById: (id: string) => Promise<UserInterface | null>
  login: (email: string, password: string) => Promise<UserInterface | null>
}
