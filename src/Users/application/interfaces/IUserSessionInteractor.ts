import { UserSessionLogInterface } from "otz-types";

export interface IUserSessionInteractor {
  createUserSession: (UserData: UserSessionLogInterface) => Promise<string | null>
  getAllUserSessions: () => Promise<UserSessionLogInterface[]>
  getUserSessionById: (id: string) => Promise<UserSessionLogInterface[] | null>
  editUserSession: (data: UserSessionLogInterface) => Promise<UserSessionLogInterface | null>
  deleteUserSession: (id: string) => Promise<number | null>;

}
