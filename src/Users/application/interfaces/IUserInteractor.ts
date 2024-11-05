import { UserInterface } from "otz-types"

export interface IUserInteractor {
  createUser: (userData: any) => Promise<UserInterface>;
  getAllUsers: () => Promise<UserInterface[]>;
  getUserById: (id: string) => Promise<UserInterface | null>;
  editUser: (data: UserInterface) => Promise<UserInterface | null>;
  login: (email: string, password: string, hospitalID: string) => Promise<UserInterface | null>;
  deleteUser: (id: string) => Promise<number | null>;
}
