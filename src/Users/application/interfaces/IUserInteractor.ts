import { UserInterface } from "otz-types"

export interface IUserInteractor {
  createUser: (userData: any) => Promise<UserInterface>
  getAllUsers: () => Promise<UserInterface[]>
  getUserById: (id: string) => Promise<UserInterface | null>
  login: (email: string, password: string) => Promise<UserInterface | null>
}
