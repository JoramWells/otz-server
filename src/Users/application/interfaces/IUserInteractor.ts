import { UserInterface } from "otz-types"
import { UserResponseInterface } from "../../entities/UserResponseInterface";

export interface IUserInteractor {
  createUser: (userData: any) => Promise<UserInterface>;
  getAllUsers: (
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<UserResponseInterface | null | undefined>;
  getUserById: (id: string) => Promise<UserInterface | null>;
  editUser: (data: UserInterface) => Promise<UserInterface | null>;
  login: (
    email: string,
    password: string,
    hospitalID: string
  ) => Promise<UserInterface | null>;
  deleteUser: (id: string) => Promise<number | null>;
  updateUserPassword: (data: UserInterface) => Promise<UserInterface | null>;
}
