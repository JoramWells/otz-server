import { UserInterface } from "otz-types"

export interface IUserRepository {
  create: (data: UserInterface) => Promise<UserInterface>;
  find: () => Promise<UserInterface[]>;
  edit: (data: UserInterface) => Promise<UserInterface | null>;
  editPassword: (data: UserInterface) => Promise<UserInterface | null>;
  findById: (id: string) => Promise<UserInterface | null>;
  login: (email: string, password: string, hospitalID: string) => Promise<UserInterface | null>;
  delete: (id: string) => Promise<number | null>;
}
