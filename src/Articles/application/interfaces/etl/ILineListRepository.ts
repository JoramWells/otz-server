import {  LineListCSVInterface } from "otz-types";
import { LineListResponseInterface } from "../../../entities/LineListResponseInterface";

export interface ILineListRepository {
  create: (data: LineListCSVInterface) => Promise<LineListCSVInterface>;
  find: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<LineListResponseInterface | null | undefined>;
  findById: (id: string) => Promise<LineListCSVInterface | null>;
  // delete: (id: string) => Promise<number | null>;
  // edit: (data: LineListCSVInterface) => Promise<LineListCSVInterface | null>;
  // findAllArticleChaptersById: (id: string) => Promise<LineListCSVInterface[] | null>;
}
