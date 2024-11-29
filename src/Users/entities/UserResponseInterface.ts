import { UserInterface } from "otz-types";

export interface UserResponseInterface {
  data: UserInterface[];
  total: number;
  page: number;
  pageSize: number;
}
