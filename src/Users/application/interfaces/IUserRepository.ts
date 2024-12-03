import { UserInterface } from "otz-types"
import { UserResponseInterface } from "../../entities/UserResponseInterface";

export interface IUserRepository {
  create: (data: UserInterface) => Promise<UserInterface>;
  find: (
    page: number,
    pageSize: number,
    searchQuery: string,
    hospitalName: string
  ) => Promise<UserResponseInterface | null | undefined>;
  edit: (data: UserInterface) => Promise<UserInterface | null>;
  editPassword: (data: UserInterface) => Promise<UserInterface | null>;
  findById: (id: string) => Promise<UserInterface | null>;
  login: (
    email: string,
    password: string,
    hospitalID: string
  ) => Promise<UserInterface | null>;
  delete: (id: string) => Promise<number | null>;
}
