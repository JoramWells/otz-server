import { UserSessionLogInterface } from "otz-types";

export interface IUserSessionRepository {
  create: (
    data: UserSessionLogInterface,
  ) => Promise<string | null>;
  find: () => Promise<UserSessionLogInterface[]>;
  findById: (id: string) => Promise<UserSessionLogInterface[] | null>;
  edit: (data: UserSessionLogInterface) => Promise<UserSessionLogInterface | null>;
  delete: (id: string) => Promise<number | null>;

}
