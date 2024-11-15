import {  LineListCSVInterface } from "otz-types";

export interface ILineListRepository {
  create: (data: LineListCSVInterface) => Promise<LineListCSVInterface>;
  find: (hospitalID: string) => Promise<LineListCSVInterface[] | null>;
  findById: (id: string) => Promise<LineListCSVInterface | null>;
  // delete: (id: string) => Promise<number | null>;
  // edit: (data: LineListCSVInterface) => Promise<LineListCSVInterface | null>;
  // findAllArticleChaptersById: (id: string) => Promise<LineListCSVInterface[] | null>;
}
